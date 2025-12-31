stage('Build Application') {
    steps {
        dir('source') {
            bat '''
            set NODE_OPTIONS=--max-old-space-size=4096
            set NEXT_DISABLE_WORKER=1
            set NEXT_TELEMETRY_DISABLED=1
            npm run build
            '''
        }
    }
}
