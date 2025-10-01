# ---- Build stage: Maven + JDK 21 ----
    FROM maven:3.9.6-eclipse-temurin-21 AS build
    WORKDIR /app
    
    # Copy the whole repo so Maven can find ../frontend from backend/pom.xml
    COPY . .
    
    # Build the Spring Boot jar (your frontend-maven-plugin will run here)
    WORKDIR /app/backend
    RUN mvn -e -X -B -DskipTests package
    
    # ---- Run stage: JRE 21 ----
    FROM eclipse-temurin:21-jre
    WORKDIR /app
    EXPOSE 8080
    
    # Copy the fat jar out of the build stage (wildcard protects against minor name changes)
    COPY --from=build /app/backend/target/*-SNAPSHOT.jar /app/app.jar
    
    # Prod profile; Railway provides $PORT
    ENV SPRING_PROFILES_ACTIVE=prod
    CMD ["sh","-c","java -Dserver.port=${PORT:-8080} -jar /app/app.jar"]
    