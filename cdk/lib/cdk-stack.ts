import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as lambda from 'aws-cdk-lib/aws-lambda'

export class DiscordBotLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const discordBotFunction = new lambda.DockerImageFunction(this, 'discordBotFunction', {
      code: lambda.DockerImageCode.fromImageAsset('../src'),
      memorySize: 1024,
      timeout: cdk.Duration.seconds(10),
      architecture: lambda.Architecture.X86_64,
      environment: {
        DISCORD_PUBLIC_KEY: 'a079ee028f3638d71c56fee682b01836a70f55baf19c102daef8ed53307f4aca',
      },
    })

    const functionUrl = discordBotFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ['*'],
        allowedMethods: [lambda.HttpMethod.ALL],
        allowedHeaders: ['*'],
      },
    })

    new cdk.CfnOutput(this, 'FunctionUrl', {
      value: functionUrl.url,
    })
  }
}
