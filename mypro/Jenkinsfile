pipeline {
    agent any

    environment {
        APP_NAME = "react-app"
        DOCKER_IMAGE = "react-app:latest"
        CONTAINER_NAME = "react-container"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/BobbyPamarthi/New-Jenkins.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t $DOCKER_IMAGE .'
                }
            }
        }

        stage('Stop Old Container') {
            steps {
                script {
                    sh '''
                    docker stop $CONTAINER_NAME || true
                    docker rm $CONTAINER_NAME || true
                    '''
                }
            }
        }

        stage('Run New Container') {
            steps {
                script {
                    sh '''
                    docker run -d \
                    --name $CONTAINER_NAME \
                    -p 3000:80 \
                    $DOCKER_IMAGE
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ React application deployed successfully!'
        }
        failure {
            echo '❌ Deployment failed!'
        }
    }
}