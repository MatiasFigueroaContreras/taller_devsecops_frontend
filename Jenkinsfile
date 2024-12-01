pipeline {
    agent any

    environment {
        GITHUB_CREDENTIALS = 'devsecops'
        GIT_REPO = 'https://github.com/MatiasFigueroaContreras/taller_devsecops_frontend.git'
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: '*/develop']],
                        doGenerateSubmoduleConfigurations: false,
                        extensions: [
                            [
                                $class: 'CloneOption',
                                depth: 1,
                                noTags: false,
                                reference: '',
                                shallow: true
                            ]
                        ],
                        userRemoteConfigs: [
                            [
                                credentialsId: "${env.GITHUB_CREDENTIALS}",
                                url: "${env.GIT_REPO}"
                            ]
                        ]
                    ])
                }
            }
        }

        stage('Instalar Dependencias') {
            steps {
                script {
                    bat 'npm install'
                }
            }
        }


        stage('Linting con ESLint') {
            steps {
                script {
                    bat '''
                        npm run lint:html
                    '''
                }
            }
        }

        stage('Archivar Reporte ESLint') {
            steps {
                archiveArtifacts artifacts: '**/reportes/reporte.html', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            echo 'Pipeline ejecutado'
        }
    }
}
