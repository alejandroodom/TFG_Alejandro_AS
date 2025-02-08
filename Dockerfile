# Usa una imagen base de Java
FROM openjdk:21-jdk-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo JAR que se genera al construir tu aplicación
COPY target/salud-0.0.1-SNAPSHOT.jar.original app.jar

# Expón el puerto que usará la aplicación
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["java", "-jar", "app.jar"]
