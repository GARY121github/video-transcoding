interface Config {
    AWS_REGION: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_SQS_QUEUE_URL: string;
    AWS_ECS_TASK_ARN: string;
    AWS_ECS_CLUSTER_ARN: string;
    AWS_ECS_CONTAINER_NAME: string;
}

const config : Config = {
    AWS_REGION: process.env.AWS_REGION || "",
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || "",
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || "",
    AWS_SQS_QUEUE_URL: process.env.AWS_SQS_QUEUE_URL || "",
    AWS_ECS_TASK_ARN: process.env.AWS_ECS_TASK_ARN || "",
    AWS_ECS_CLUSTER_ARN: process.env.AWS_ECS_CLUSTER_ARN || "",
    AWS_ECS_CONTAINER_NAME: process.env.AWS_ECS_CONTAINER_NAME || ""
}

export default config;