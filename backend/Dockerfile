FROM openjdk:21-jdk-slim

WORKDIR /app

COPY target/salud-0.0.1-SNAPSHOT.jar app.jar

#Expone el puerto que usará la aplicación
EXPOSE 8080

#Comando para iniciar la aplicación
CMD ["java", "-jar", "app.jar"]

FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY .. .
RUN mvn clean package -DskipTests

FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=build /app/target/salud-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
