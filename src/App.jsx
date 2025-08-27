import './App.css';
import { useState, useEffect, createContext, useContext } from 'react';
import { Eye, EyeOff, User, Mail, Lock, LogOut } from 'lucide-react';


const AuthContext = createContext();

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de AuthProvider');
    }
    return context;
};



//Proveedor de autenticación
// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {

    //Estado para el usuario autenticado
    const [user, setUser] = useState(null);
    //Estado para indicar si la aplicación está cargando
    const [loading, setLoading] = useState(true);
    //Estado para el token de autenticacion
    const [token, setToken] = useState(null);
    //Estado para el paso actual (login, dashboard, userdata, plan)
    const [currentStep, setCurrentStep] = useState('login');

    //Efecto para cargar el token y usuario guardados en localStorage
    useEffect(() => {
        const savedToken = localStorage.getItem('authToken');
        const savedUser = localStorage.getItem('userData');

        if (savedToken && savedUser) {
            setToken(savedToken);
            const userData = JSON.parse(savedUser);
            setUser(userData);
            // Verificar si tiene datos de salud al cargar la aplicación
            checkUserHealthData(userData.id);
        }
        setLoading(false);
    }, []);

    //Función para verificar si el usuario tiene datos de salud
    const checkUserHealthData = async (userId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/user/has-data/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const hasData = await response.json();
                if (hasData) {
                    setCurrentStep('plan'); //Ir al área de salud si tiene datos
                } else {
                    setCurrentStep('dashboard'); //Ir al dashboard (perfil) si no tiene datos
                }
            } else {
                setCurrentStep('dashboard'); //Por defecto ir al dashboard
            }
        } catch (error) {
            console.error('Error verificando datos de salud:', error);
            setCurrentStep('dashboard');
        }
    };

    //Función inicio sesion
    const login = async (email, password) => {
        try {
            //Realiza la petición al backend para iniciar sesion
            const response = await fetch('http://localhost:8080/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setToken(data.accessToken);
                const userData = {
                    id: data.id,
                    username: data.username,
                    email: data.email
                };
                setUser(userData);

                localStorage.setItem('authToken', data.accessToken);
                localStorage.setItem('userData', JSON.stringify(userData));

                //Verificar si el usuario tiene datos de salud
                if (data.hasHealthData) {
                    setCurrentStep('plan');
                } else {
                    setCurrentStep('dashboard');
                }

                return {
                    success: true
                };

            } else{
                return{
                    success: false, error: data.message || 'No ha sido posible iniciar sesión'
                };
            }

        } catch (err){
            console.error('Login error:', err);
            return { success: false, error: 'Error de conexión' };
        }
    };

    //Función registro usuario
    const register = async (username, email, password) => {
        try {
            //Realiza la petición al backend para registrar un nuevo usuario
            const response = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                return {
                    success: true, message: data.message
                };

            } else {
                return {
                    success: false, error: data.message || 'Error al registrarse'
                };
            }

        } catch (err) {
            console.error('Register error:', err);
            return {
                success: false, error: 'Error de conexión'
            };
        }
    };

    //Función cerrar sesión
    const logout = () => {
        setToken(null);
        setUser(null);
        setCurrentStep('login');


        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
    };

    //Función para navegar al dashboard (perfil)
    const goToDashboard = () => {
        setCurrentStep('dashboard');
    };

    //Función para navegar al formulario de datos del usuario
    const goToUserDataForm = () => {
        setCurrentStep('userdata');
    };

    //Función para navegar al plan
    const goToPlan = () => {
        setCurrentStep('plan');
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            loading,
            currentStep,
            login,
            register,
            logout,
            goToDashboard,
            goToUserDataForm,
            goToPlan
        }}>
            {children}
        </AuthContext.Provider>
    );
};


//Componente de Inicio de Sesión
// eslint-disable-next-line react/prop-types
const LoginForm = ({ onToggleForm }) => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    //Función para el envío del formulario de inicio de sesión
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');


        const result = await login(email, password);

        if (!result.success) {
            setError(result.error);
        }
        setLoading(false);

    };


    return (
        <div className="wide100 maxwd1 mx-auto bg-white border1 s1 pr3">
            <div className="text-center mb3">
                <div className="LOGO w5 h5  flex ic jc mx-auto mb2">
                </div>
                <h2 className="text-3xl font-bold text-gray3">Inicio Sesión</h2>
                <p className="text-gray2 mt21">Bienvenido a HarmToHealth</p>
            </div>

            <form onSubmit={handleSubmit} className="mt3">
                <div className="mt2">
                    <div>
                        <label className="block text-sm font-semibold text-gray3 mb1">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left1 top1 text-gray1 w2 h2" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="colorbox wide100 pl1 pr3 ptb1 border borderblc rounded-box"
                                placeholder="tu@email.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray3 mb1">
                            Contraseña
                        </label>
                        <div className="relative">
                            <Lock className="absolute left1 top1  text-gray1 w2 h2" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="colorbox wide100 pl1 pr12 ptb1 border borderblc rounded-box"
                                placeholder="Tu contraseña"
                            />

                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right1 top1  text-gray1 "
                            >
                             {showPassword ? <EyeOff className="w2 h2" /> : <Eye className="w2 h2" />}
                            </span>

                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bgr border border-red text-red prl1 ptb1">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="wide100 bgpr text-white ptb1 rounded-full font-medium"
                >
                    {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </button>

                <div className="text-center">
                    <p className="text-gray2">
                        ¿No tienes cuenta?{' '}
                        <span
                            onClick={onToggleForm}
                            className="registro font-semibold"
                        >
                            Regístrate
                        </span>

                    </p>
                </div>
            </form>
        </div>
    );
};

// Componente de Registro
// eslint-disable-next-line react/prop-types
const RegisterForm = ({ onToggleForm }) => {


    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();

    //Función para  el envío del formulario de registro
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            setLoading(false);
            return;
        }


        const result = await register(username, email, password);


        if (result.success) {

            setSuccess(result.message);
            setTimeout(() => {
                onToggleForm();
            }, 2000);

        } else {
            setError(result.error);
        }


        setLoading(false);
    };



    return (

        <div className="wide100 maxwd1 mx-auto bg-white border1 s1 pr3">
            <div className="text-center mb3">
                <div className="LOGO w5 h5 flex ic jc mx-auto mb2">

                </div>
                <h2 className="text-3xl font-bold text-gray3">Registro</h2>
                <p className="text-gray2 mt21">Únete a HarmToHealth</p>
            </div>

            <form onSubmit={handleSubmit} className="mt3">
                <div className="mt2">
                    <div>
                        <label className="block text-sm font-semibold text-gray3 mb1">
                            Usuario
                        </label>
                        <div className="relative">
                            <User className="absolute left1 top1 text-gray1 w2 h2" />
                            <input

                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                minLength={3}
                                maxLength={20}
                                className="colorbox wide100 pl1 pr3 ptb1 border borderblc rounded-box "
                                placeholder="Tu nombre de usuario"

                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray3 mb1">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left1 top1 text-gray1 w2 h2" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="colorbox wide100 pl1 pr3 ptb1 border borderblc  rounded-box"
                                placeholder="tu@email.com"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray3 mb1">
                            Contraseña
                        </label>
                        <div className="relative">
                            <Lock className="absolute left1 top1 text-gray1 w2 h2" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                className="colorbox wide100 pl1 pr12 ptb1 border borderblc rounded-box"
                                placeholder="Tu contraseña"
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right1 top1 text-gray1  "
                            >
                            {showPassword ? <EyeOff className="w2 h2" /> : <Eye className="w2 h2" />}
                            </span>

                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray3 mb1">
                            Confirmar contraseña
                        </label>
                        <div className="relative">
                            <Lock className="absolute left1 top1 text-gray1 w2 h2" />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="colorbox wide100 pl1 pr3 ptb1 border borderblc rounded-box"
                                placeholder="Confirma tu contraseña"
                            />
                        </div>
                    </div>

                </div>

                {error && (
                    <div className="bgr border border-red text-red prl1 ptb1">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bgw border border-green text-green prl1 ptb1 ">

                        {success}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="wide100 bgo text-white ptb1 rounded-full font-medium"
                >
                    {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                </button>

                <div className="text-center">
                    <p className="text-gray2">
                        ¿Ya tienes cuenta?{' '}
                        <span onClick={onToggleForm} className="iniciosesion font-semibold">
                        Inicia sesión
                        </span>

                    </p>
                </div>
            </form>
        </div>
    );
};



//Componente perfil usuario
const Dashboard = () => {

    const { user, logout, goToUserDataForm } = useAuth();

    return (
        <div className="minh bg-gradient-to-br ">
            <nav className="bg-white s2">
                <div className="mwte3 mx-auto prl1">
                    <div className="flex jb h5 ic">
                        <div className="flex ic">
                            <div className="HH" />
                        </div>


                        <div className="flex ic ml">
                            <span className="text-gray2">Hola, {user?.username}</span>
                            <button
                                onClick={logout}
                                className="inline-flex ic prl1 border border-transparent text-sm font-medium rounded-md text-white bgb blc  "
                            >
                                <LogOut className="w1 h1 mr1" />
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </nav>


            <main className="mwte3 mx-auto ptb2">
                <div className="prl1 ptb2">
                    <div className="pr3">
                        <div className="text-center">
                            <h2 className="text-white text-2xl font-bold mb2">
                                Tu Cuenta de HarmToHealth
                            </h2>
                            <div className="bg-white s3 p2 maxwd1 mx-auto">
                                <h3 className="text-lg font-medium text-gray3 mb2">
                                    Información del Usuario
                                </h3>
                                <div className="mt1">
                                    <div className="flex ic">
                                        <User className="w2 h2 text-gray2 mr2" />
                                        <span className="text-gray2">Usuario:</span>
                                        <span className="username mdw1 font-medium">{user?.username}</span>
                                    </div>
                                    <div className="flex ic">
                                        <Mail className="w2 h2 text-gray2 mr2" />
                                        <span className="text-gray2">Email:</span>
                                        <span className="email mdw1 font-medium">{user?.email}</span>
                                    </div>
                                </div>
                            </div>
                            <h1 className="txt text-2xl font-small mxl ">
                                Comienza el cambio a una nueva realidad.
                            </h1>
                            <button
                                onClick={goToUserDataForm}
                                className=" prl2  text-white  ptb1 rounded-full font-small text-m  "
                            >
                                Comenzar
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};




//Componente formulario
const UserDataForm = () => {

    const [formData, setFormData] = useState({
        sexo: '',
        edad: '',
        peso: '',
        altura: '',
        objetivo: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [initialLoading, setInitialLoading] = useState(false);
    const { user, token, goToPlan } = useAuth();

    useEffect(() => {
        checkIfEditing();
    }, [user]);

    //Función para verificar si es modo edición y cargar datos
    const checkIfEditing = async () => {

        if(!user) return;


        try {
            setInitialLoading(true);

            //Verificar si el usuario tiene datos existentes
            const hasDataResponse = await fetch(`http://localhost:8080/api/user/has-data/${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });


            if (hasDataResponse.ok) {
                const hasData = await hasDataResponse.json();

                if (hasData) {
                    setIsEditing(true);
                    //Cargar los datos
                    const dataResponse = await fetch(`http://localhost:8080/api/user/data/${user.id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (dataResponse.ok) {
                        const userData = await dataResponse.json();
                        setFormData({
                            sexo: userData.sexo || '',
                            edad: userData.edad?.toString() || '',
                            peso: userData.peso?.toString() || '',
                            altura: userData.altura?.toString() || '',
                            objetivo: userData.objetivo || ''
                        });
                    }
                }
            }

        } catch (error) {
            console.error('Error cargando datos de usuario:', error);
        } finally {
            setInitialLoading(false);
        }
    };



    //Objetivos
    const objetivos = [
        { value: 'bajar_peso', label: 'Bajar de peso' },
        { value: 'aumentar_musculo', label: 'Aumentar masa muscular' },
        { value: 'revertir_condicion', label: 'Revertir condición/enfermedad' },
        { value: 'mejorar_salud', label: 'Mejorar salud general' }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    //Función para validar el formulario
    const validateForm = () => {
        if (!formData.sexo || !formData.edad || !formData.peso || !formData.altura || !formData.objetivo) {
            setError('Todos los campos son obligatorios.');
            return false;
        }

        const edad = parseInt(formData.edad);
        const peso = parseFloat(formData.peso);
        const altura = parseFloat(formData.altura);

        if (edad < 16 || edad > 99) {
            setError('La edad debe estar entre 16 y 99 años');
            return false;
        }

        if (peso < 30 || peso > 300) {
            setError('El peso debe estar entre 30 y 300 kg');
            return false;
        }

        if (altura < 120 || altura > 250) {
            setError('La altura debe estar entre 120 y 250 cm');
            return false;
        }

        return true;
    };

    //Función para el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const method = isEditing ? 'PUT' : 'POST';
            const url = isEditing
                ? `http://localhost:8080/api/user/data/${user.id}`
                : 'http://localhost:8080/api/user/data';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId: user.id,
                    ...formData,
                    edad: parseInt(formData.edad),
                    peso: parseFloat(formData.peso),
                    altura: parseFloat(formData.altura)
                }),
            });

            const data = await response.json();



            if (response.ok) {

                setTimeout(() => {
                    goToPlan();
                }, 1000);

            } else {
                setError(data.message || 'Error al guardar los datos');
            }

        } catch (err) {
            console.error('Error:', err);
            setError('Error de conexión');
        }

        setLoading(false);
    };


    if (initialLoading) {
        return (
            <div className="bgfo minh flex ic jc ptb2">
                <div className="text-center text-white">
                    <div className="rounded-full h4 w4 mx-auto mb2"></div>
                    <p>Cargando datos...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bgfo minh flex ic jc ptb2">
            <div className="wide100 mx-auto bg-b border1 s1 pr3">
                <div className="text-center mb3">
                    <h2 className="text-2xl font-semibold text-white">
                        {isEditing ? 'Modificar Datos Personales' : 'Datos Personales'}
                    </h2>

                    <p className="text-white mt21 font-small">
                        {isEditing
                            ? 'Actualiza tus datos para regenerar tu plan personalizado.'
                            : 'Rellena el formulario para poder diseñar un plan a tu medida.'
                        }
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y6">

                    <div>
                        <label className="block text-sm font-medium text-white ptb1">
                            Sexo *
                        </label>
                        <select
                            name="sexo"
                            value={formData.sexo}
                            onChange={handleInputChange}
                            className="formc wide100 prl1 ptb1 border borderblc "
                        >
                            <option value="">Selecciona tu sexo</option>
                            <option value="hombre">Hombre</option>
                            <option value="mujer">Mujer</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white ptb1">
                            Edad *
                        </label>
                        <input
                            type="number"
                            name="edad"
                            value={formData.edad}
                            onChange={handleInputChange}
                            min="16"
                            max="99"
                            className="formc wide100 prl1 ptb1 border borderblc"
                            placeholder="Ej: 28"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white ptb1">
                            Peso (kg) *
                        </label>
                        <input
                            type="number"
                            name="peso"
                            value={formData.peso}
                            onChange={handleInputChange}
                            min="30"
                            max="300"
                            step="0.1"
                            className="formc wide100 prl1 ptb1 border borderblc"
                            placeholder="Ej: 77"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white ptb1">
                            Altura (cm) *
                        </label>
                        <input
                            type="number"
                            name="altura"
                            value={formData.altura}
                            onChange={handleInputChange}
                            min="120"
                            max="250"
                            className="formc wide100 prl1 ptb1 border borderblc"
                            placeholder="Ej: 181"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white ptb1">
                            Objetivo *
                        </label>
                        <select
                            name="objetivo"
                            value={formData.objetivo}
                            onChange={handleInputChange}
                            className="formc wide100 prl1 ptb1 border borderblc "
                        >
                            <option value="">Selecciona tu objetivo</option>
                            {objetivos.map(obj => (
                                <option key={obj.value} value={obj.value}>
                                    {obj.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {error && (
                        <div className="bgr border border-red text-red prl1 ptb1">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btnst prl2 text-gray3 rounded-full font-medium "
                    >
                        {loading ?
                            (isEditing ? 'Actualizando datos...' : 'Generando tu plan...') :
                            (isEditing ? 'Actualizar Mi Plan Personalizado' : 'Crear Mi Plan Personalizado')
                        }
                    </button>
                </form>
            </div>
        </div>
    );
};


//Componente del plan y area de salud
const PlanView = () => {
    const { user, logout, goToUserDataForm, goToDashboard } = useAuth();
    const [planData, setPlanData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showProgress, setShowProgress] = useState(false);


    useEffect(() => {
        fetchUserPlan();
    }, []);

    //Función para obtener el plan del usuario
    const fetchUserPlan = async () => {
        try {
            //Realiza la petición al backend para obtener el plan del usuario
            const response = await fetch(`http://localhost:8080/api/user/plan/${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (response.ok) {
                setPlanData(data);
            } else {
                setError(data.message || 'Error al cargar el plan');
            }

        } catch (err) {
            console.error('Error:', err);
            setError('Error de conexión');
        }

        setLoading(false);
    };


    const handleEditParameters = () => {
        goToUserDataForm();
    };


    const handleViewProfile = () => {
        goToDashboard();
    };


    const handleShowProgress = () => {
        setShowProgress(true);
    };


    const handleBackFromProgress = () => {
        setShowProgress(false);
    };


    //Función para verificar si debe mostrar botón de progreso
    const shouldShowProgressButton = () => {
        if (!planData?.userData) return false;
        const objetivo = planData.userData.objetivo;
        return objetivo === 'bajar_peso' || objetivo === 'aumentar_musculo';
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="minh bg-gradient-to-br flex ic jc">
                <div className="bgr border border-red text-red">
                    {error}
                </div>
            </div>
        );
    }

    if (showProgress) {
        return (
            <WeightProgressView
                user={user}
                userData={planData?.userData}
                onBack={handleBackFromProgress}
                onLogout={logout}
            />
        );
    }

    return (
        <div className="minh">
            <nav className="bgb s2">
                <div className="mwte3 mx-auto prl1">
                    <div className="flex jb h5">
                        <div className="flex ic">
                            <h1 className="text-xl font-bold HHL"></h1>
                        </div>
                        <div className="flex ic ">
                            <span className="text-gray2 mr2">Hola, {user?.username}</span>

                            <button
                                onClick={handleViewProfile}
                                className="inline-flex ic border border-transparent text-sm font-medium rounded-md text-gray3 formc mr2"
                                title="Ver perfil de usuario"
                            >
                                👤
                            </button>

                            <button
                                onClick={handleEditParameters}
                                className="inline-flex ic mr2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                                title="Modificar parámetros de salud"
                            >
                                ⚙️
                            </button>

                            <button
                                onClick={logout}
                                className="inline-flex ic prl1 border border-transparent text-sm font-medium rounded-md text-gray3 bgw"
                            >
                                <LogOut className="w1 h1 mr1" />
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="mwform mx-auto ">
                <div className="wss">
                    <div className=" text-center wwd">
                        <h2 className="mt11 text-3xl font-semibold text-white mb1">
                            Tu espacio de salud
                        </h2>
                        <p className="text-gray2">
                            Diseñado especialmente para ti según tus objetivos.
                        </p>
                    </div>

                    {planData && (
                        <div className="dataform">
                            <h3 className="pcf text-xl font-semibold text-white mb2 flex ic">
                                Plan Nutricional
                            </h3>

                            <div className="bg-nut rounded-card s1 p2">
                                <div className="mt2">
                                    <div className="colorbox p1 rounded-card">
                                        <h4 className="font-semibold text-white mb1">Tipo de Dieta:</h4>
                                        <p className="text-white">{planData.planNutricional?.tipoDieta}</p>
                                    </div>
                                    <div className="colorbox p1 rounded-card">
                                        <h4 className="font-semibold text-white mb1">Comidas por día:</h4>
                                        <p className="text-white">{planData.planNutricional?.comidasPorDia}</p>
                                    </div>
                                    <div className="colorbox p1 rounded-card">
                                        <h4 className="font-semibold text-white mb1">Descripción:</h4>
                                        <p className="text-white">{planData.planNutricional?.descripcion}</p>
                                    </div>
                                </div>
                            </div>

                            <h3 className="pcf text-xl font-semibold text-white mb2 flex ic">
                                Plan de Entrenamiento
                            </h3>

                            <div className="bg-ent rounded-card s1 p2">
                                <div className="mt2">
                                    <div className="colorbox p1 rounded-card">
                                        <h4 className="font-semibold text-white mb1">Tipo:</h4>
                                        <p className="text-white">{planData.planEntrenamiento?.tipo}</p>
                                    </div>
                                    <div className="colorbox p1 rounded-card">
                                        <h4 className="font-semibold text-white mb1">Intensidad:</h4>
                                        <p className="text-white">{planData.planEntrenamiento?.intensidad}</p>
                                    </div>
                                    <div className="colorbox p1 rounded-card">
                                        <h4 className="font-semibold text-white mb1">Descripción:</h4>
                                        <p className="text-white">{planData.planEntrenamiento?.descripcion}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {planData && (
                        <div className="dataform pbt">
                                <h3 className="pcf text-xl font-semibold text-white mb2 flex ic">
                                    Tu Información
                                </h3>


                            <div className="bg-inf rounded-card s1 p2">
                                <div className="d">
                                    <div className=" p1 text-center">
                                        <h4 className="font-semibold text-white">Objetivo</h4>
                                        <p className="text-lg font-medium text-white">{planData.objetivoTexto}</p>
                                    </div>
                                    <div className=" p1 text-center">
                                        <h4 className="font-semibold text-white">IMC</h4>
                                        <p className="text-lg font-bold text-white">{planData.imc}</p>
                                        <p className="text-sm text-white">{planData.categoriaIMC}</p>
                                    </div>
                                </div>


                                {planData.userData && (
                                    <div className="mt2 grid grid-cols-2 gap1">
                                        <div className="p1 text-center">
                                            <h4 className="font-semibold text-white text-sm">Edad</h4>
                                            <p className="text-white">{planData.userData.edad} años</p>
                                        </div>
                                        <div className="p1 text-center">
                                            <h4 className="font-semibold text-white text-sm">Sexo</h4>
                                            <p className="text-white">
                                                {planData.userData.sexo === 'hombre' ? 'Masculino' : 'Femenino'}
                                            </p>
                                        </div>
                                        <div className="p1 text-center">
                                            <h4 className="font-semibold text-white text-sm">Peso</h4>
                                            <p className="text-white">{planData.userData.peso} kg</p>
                                        </div>
                                        <div className="p1 text-center">
                                            <h4 className="font-semibold text-white text-sm">Altura</h4>
                                            <p className="text-white">{planData.userData.altura} cm</p>
                                        </div>
                                    </div>

                                )}
                                {shouldShowProgressButton() && (
                                    <button
                                        onClick={handleShowProgress}
                                        className="text-center jc ic prl1 border border-transparent text-sm font-medium rounded-md text-gray3 bgw"
                                    >
                                        Mi progreso
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};



//Componente Gráfico para mostrar la evolución del peso
const WeightChart = ({ data, objetivo }) => {


    if (!data || data.length === 0) {
        return (
            <div className="text-center text-gray2">
                No hay datos para mostrar.
            </div>
        );
    }

    const width = 600;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    const weights = data.map(d => d.peso);
    const minWeight = Math.min(...weights) - 2;
    const maxWeight = Math.max(...weights) + 2;
    const weightRange = maxWeight - minWeight;



    const xScale = (index) => (index / (data.length - 1)) * chartWidth;
    const yScale = (weight) => chartHeight - ((weight - minWeight) / weightRange) * chartHeight;


    const pathData = data.map((d, i) => {
        const x = xScale(i);
        const y = yScale(d.peso);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    const getLineColor = () => {
        if (data.length < 2) return '#7d7d7d';

        const firstWeight = data[0].peso;
        const lastWeight = data[data.length - 1].peso;
        const change = lastWeight - firstWeight;

        if (objetivo === 'bajar_peso') {
            return change < 0 ? '#3dea62' : change > 0 ? '#fe2857' : '#7d7d7d';
        } else if (objetivo === 'aumentar_musculo') {
            return change > 0 ? '#3dea62' : change < 0 ? '#fe2857' : '#7d7d7d';
        }

        return '#087cfa';
    };



    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit'
        });
    };

    return (
        <div className="w-full overflow-x-auto">
            <svg width={width} height={height} className="mx-auto">

                <g transform={`translate(${margin.left}, ${margin.top})`}>

                    {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                        const y = ratio * chartHeight;
                        const weight = minWeight + (1 - ratio) * weightRange;
                        return (
                            <g key={ratio}>
                                <line
                                    x1={0}
                                    y1={y}
                                    x2={chartWidth}
                                    y2={y}
                                    stroke="#e5e7eb"
                                    strokeWidth="1"
                                />
                                <text
                                    x={-10}
                                    y={y + 4}
                                    textAnchor="end"
                                    fontSize="12"
                                    fill="#6b7280"
                                >
                                    {weight.toFixed(1)}
                                </text>
                            </g>
                        );
                    })}

                    <path
                        d={pathData}
                        fill="none"
                        stroke={getLineColor()}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />



                    {data.map((d, i) => {
                        const x = xScale(i);
                        const y = yScale(d.peso);

                        return (
                            <g key={d.id || i}>
                                <circle
                                    cx={x}
                                    cy={y}
                                    r="4"
                                    fill={getLineColor()}
                                    stroke="white"
                                    strokeWidth="2"
                                />

                                <text
                                    x={x}
                                    y={y - 10}
                                    textAnchor="middle"
                                    fontSize="11"
                                    fill="#374151"
                                    fontWeight="bold"
                                >
                                    {d.peso}kg
                                </text>
                            </g>
                        );
                    })}


                    {data.map((d, i) => {
                        const x = xScale(i);
                        return (
                            <text
                                key={d.id || i}
                                x={x}
                                y={chartHeight + 15}
                                textAnchor="middle"
                                fontSize="10"
                                fill="#7d7d7d"
                            >
                                {formatDate(d.recordedAt)}
                            </text>
                        );
                    })}
                </g>




                <text
                    x={margin.left + chartWidth / 2}
                    y={height - 5}
                    textAnchor="middle"
                    fontSize="12"
                    fill="#7d7d7d"
                    fontWeight="bold"
                >
                    Fecha
                </text>
                <text
                    x={15}
                    y={margin.top + chartHeight / 2}
                    textAnchor="middle"
                    fontSize="12"
                    fill="#374151"
                    fontWeight="bold"
                    transform={`rotate(-90, 15, ${margin.top + chartHeight / 2})`}

                >
                    Peso (kg)
                </text>



                <text

                    x={width / 2}
                    y={15}
                    textAnchor="middle"
                    fontSize="14"
                    fill="#1f2937"
                    fontWeight="bold"
                >
                    Evolución del Peso
                </text>
            </svg>


            <div className="text-center text-sm text-gray2">
                <div className="flex ic jc">
                    <div className="w1 h1 rounded-full mr1" style={{ backgroundColor: getLineColor() }}></div>
                    <span>
                        {objetivo === 'bajar_peso' ? 'Progreso de pérdida de peso' :
                            objetivo === 'aumentar_musculo' ? 'Progreso de ganancia de peso' :
                                'Evolución del peso'}
                    </span>
                </div>
                {data.length >= 2 && (
                    <div className="mt1">
                        {(() => {
                            const change = data[data.length - 1].peso - data[0].peso;
                            return (
                                <span style={{ color: getLineColor() }}>
                                    {change > 0 ? '+' : ''}{change.toFixed(1)} kg desde el inicio
                                </span>
                            );
                        })()}
                    </div>
                )}
            </div>
        </div>

    );
};




//Componente para mostrar el progreso de peso con gráfico
const WeightProgressView = ({ user, userData, onBack, onLogout }) =>{


    const [weightHistory, setWeightHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [weightProgress, setWeightProgress] = useState(null);


    useEffect(()=>{
        if (user) {
            fetchWeightData();
        }
    }, [user]);

    const fetchWeightData = async () => {

        try{
            setLoading(true);

            const historyResponse = await fetch(`http://localhost:8080/api/user/weight-history/${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if(historyResponse.ok) {
                const history = await historyResponse.json();
                setWeightHistory(history);
            }


            const progressResponse = await fetch(`http://localhost:8080/api/user/weight-progress/${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (progressResponse.ok) {
                const progress = await progressResponse.json();
                setWeightProgress(progress);
            }

        } catch (err) {
            console.error('Error fetching weight data:', err);
            setError('Error al cargar los datos de progreso');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };



    const getProgressMessage = () => {
        if (!weightProgress || !weightProgress.hasHistory || weightHistory.length < 2) {
            return "Aún no hay suficientes datos para mostrar progreso";
        }


        const change = weightProgress.weightChange;
        const objetivo = userData?.objetivo;

        if (objetivo === 'bajar_peso'){
            if (change < 0) {
                return `¡Excelente! Has perdido ${Math.abs(change).toFixed(1)} kg`;
            } else if (change > 0) {
                return `Has ganado ${change.toFixed(1)} kg. ¡Sigue trabajando hacia tu objetivo!`;
            } else {
                return "Tu peso se mantiene estable.";
            }
        } else if (objetivo === 'aumentar_musculo') {
            if (change > 0) {
                return `¡Genial! Has ganado ${change.toFixed(1)} kg`;
            } else if (change < 0) {
                return `Has perdido ${Math.abs(change).toFixed(1)} kg. Ajusta tu plan para ganar masa muscular.`;
            } else {
                return "Tu peso se mantiene estable.";
            }
        }

        return `Cambio en el peso: ${change > 0 ? '+' : ''}${change.toFixed(1)} kg`;
    };

    const getProgressColor = () => {
        if (!weightProgress || !weightProgress.hasHistory) return '#6b7280';

        const change = weightProgress.weightChange;
        const objetivo = userData?.objetivo;

        if (objetivo === 'bajar_peso') {
            return change < 0 ? '#3dea62' : change > 0 ? '#fe2857' : '#7d7d7d';
        } else if (objetivo === 'aumentar_musculo') {
            return change > 0 ? '#3dea62' : change < 0 ? '#fe2857' : '#7d7d7d';
        }

        return '#7c7c7c';
    };

    if (loading) {
        return (
            <div className="minh flex ic jc">
                <div className="text-center text-white">
                    <div className="rounded-full h4 w4 mx-auto mb2"></div>
                    <p>Cargando datos de progreso...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="minh">
            {}
            <nav className="bgb s2">
                <div className="mwte3 mx-auto prl1">
                    <div className="flex jb h5">
                        <div className="flex ic">
                            <button
                                onClick={onBack}
                                className="text-white mr2 rounded-md"
                            >
                                ←
                            </button>
                            <h1 className="text-m font-semibold text-white">Mi Progreso</h1>
                        </div>
                        <div className="flex ic">
                            <span className="text-gray2 mr2">Hola, {user?.username}</span>
                            <button
                                onClick={onLogout}
                                className="inline-flex ic prl1 border border-transparent text-sm font-medium rounded-md text-gray3 bgw"
                            >
                                <LogOut className="w1 h1 mr1" />
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </nav>



            <main className="mwform mx-auto ptb2">
                <div className="wss">
                    <div className="text-center wwd">
                        <h2 className="text-3xl font-semibold text-white mb1">
                            Seguimiento de Peso
                        </h2>
                        <p className="text-gray2 mb2">
                            {userData?.objetivo === 'bajar_peso' ?
                                'Monitorea tu progreso de pérdida de peso.' :
                                'Monitorea tu progreso de ganancia de masa muscular.'
                            }
                        </p>
                    </div>

                    <div className="dataform">
                        <div className="bg-white rounded-card s1 p2 text-center">
                            <h3 className="text-xl font-semibold text-gray3 mb2">
                                Resumen del Progreso
                            </h3>
                            <div className="text-lg mb2" style={{ color: getProgressColor() }}>
                                {getProgressMessage()}
                            </div>

                            {weightHistory.length >= 2 && (
                                <div className="grid grid-cols-2 gap2 mt2">
                                    <div className="text-center">
                                        <h4 className="font-semibold text-gray3">Peso Inicial</h4>
                                        <p className="text-xl font-bold text-gray2">
                                            {weightHistory[0]?.peso} kg
                                        </p>
                                        <p className="text-sm text-gray1">
                                            {formatDate(weightHistory[0]?.recordedAt)}
                                        </p>
                                    </div>

                                    <div className="text-center">

                                        <h4 className="font-semibold text-gray3">Peso Actual</h4>
                                        <p className="text-xl font-bold text-gray2">
                                            {weightHistory[weightHistory.length - 1]?.peso} kg
                                        </p>


                                        <p className="text-sm text-gray1">
                                            {formatDate(weightHistory[weightHistory.length - 1]?.recordedAt)}
                                        </p>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>


                    {weightHistory.length > 0 && (
                        <div className="dataform">
                            <h3 className="pcf text-xl font-semibold text-white mb2">
                                Gráfico de Evolución
                            </h3>

                            <div className="bg-white rounded-card s1 p2">
                                <WeightChart data={weightHistory} objetivo={userData?.objetivo} />
                            </div>
                        </div>
                    )}


                    {weightHistory.length > 0 && (

                        <div className="dataform">
                            <h3 className="pcf text-xl font-semibold text-white mb2">
                                Historial
                            </h3>
                            <div className="bg-white rounded-card s1 p2">
                                <div className="a">
                                    {weightHistory.map((record) => (
                                        <div key={record.id} className="flex jb ic p1 ">
                                            <div>
                                                <span className="font-medium text-gray3">
                                                    {record.peso} kg
                                                </span>

                                            </div>
                                            <div className="text-sm text-gray1">
                                                {formatDate(record.recordedAt)}
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    )}


                    {weightHistory.length === 0 && (

                        <div className="dataform">
                            <div className="bg-white rounded-card s1 p2 text-center">
                                <h3 className="text-lg font-semibold text-gray3 mb2">
                                    Sin datos de progreso
                                </h3>
                                <p className="text-gray2">
                                    Aún no tienes registros de peso. El seguimiento comenzará en cuanto actualices tu peso en el icono de configuración.
                                </p>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="dataform">
                            <div className="bgr border border-red text-red prl1 ptb1">
                                {error}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};


import PropTypes from 'prop-types';

WeightChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        peso: PropTypes.number.isRequired,
        recordedAt: PropTypes.string.isRequired
    })).isRequired,
    objetivo: PropTypes.string
};


WeightProgressView.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
    }).isRequired,
    userData: PropTypes.shape({
        objetivo: PropTypes.string
    }),
    onBack: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired
};

//Componente de carga
const LoadingSpinner = () => (
    <div className="minh bg-gradient-to-br flex ic jc">
        <div className="rounded-full h4 w4"></div>
    </div>
);


//Componente principal de la aplicación
const App = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { user, loading, currentStep } = useAuth();


    if (loading) {
        return <LoadingSpinner />;
    }


    if (!user) {
        return (
            <div className="minh bg-gradient-to-br flex ic jc p1">
                {isLogin ? (
                    <LoginForm onToggleForm={() => setIsLogin(false)} />
                ) : (
                    <RegisterForm onToggleForm={() => setIsLogin(true)} />
                )}
            </div>
        );
    }


    switch (currentStep) {
        case 'dashboard':
            return <Dashboard />;
        case 'userdata':
            return <UserDataForm />;
        case 'plan':
            return <PlanView />;
        default:
            return <Dashboard />;
    }


};


export default function AuthApp() {
    return (
        <AuthProvider>
            <App />
        </AuthProvider>
    );
}