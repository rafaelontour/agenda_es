pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'prototipo', url: 'https://github.com/rafaelontour/agenda_es.git'
            }
        }

        stage('Build & Deploy') {
            steps {
                sh '''
                    # Remove o container se existir, mantendo volumes
                    docker rm -f mysql_container || true

                    echo "Subindo containers com Docker Compose"
                    docker-compose up -d --build
                '''
            }
        }
    }
}
