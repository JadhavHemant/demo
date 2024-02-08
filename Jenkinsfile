pipeline {
   agent any
   tools {nodejs "node"}
   stages{
      stage('Compile Stage'){

         steps{
            sh 'npm install'
            sh 'npm run build'
          }

      }
   }
}