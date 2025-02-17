# Usa una imagen base de Java
FROM openjdk:21-jdk-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo JAR que se genera al construir tu aplicación
COPY target/salud-0.0.1-SNAPSHOT.jar app.jar

# Expón el puerto que usará la aplicación
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["java", "-jar", "app.jar"]

# Etapa de construcción con JDK 21
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY .. .
RUN mvn clean package -DskipTests

# Etapa de ejecución
FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=build /app/target/salud-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
