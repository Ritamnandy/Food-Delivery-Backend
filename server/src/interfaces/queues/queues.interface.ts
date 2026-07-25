

interface PasswordChangedJobData
{
    email: string
    userName: string
}
interface verificationEmailJobData extends PasswordChangedJobData
{
    token: string
}
interface forgotPasswordEmailJobData extends PasswordChangedJobData
{

    link: string
}
interface orderConfirmedEmailJobData
{
    email: string
    userName: string
    link: string
}

export type {
    PasswordChangedJobData,
    verificationEmailJobData,
    forgotPasswordEmailJobData,
    orderConfirmedEmailJobData
}