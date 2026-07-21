
import Nodemailer from "nodemailer"
import Mailgen from "mailgen"
import { logger } from "./logger.js"

const transporter = Nodemailer.createTransport( {
    service: "gmail",
    auth: {
        user: process.env.EMAIL as string,
        pass: process.env.APP_PASSWORD as string,
    },
} );

const mailGenerator = new Mailgen( {
    theme: "default",
    product: {
        name: "Expense Tracker",
        link: "https://expense-tracker-ten.vercel.app/",
    },
} );



const sendVerificationEmail = async ( userEmail: string, userName: string, token: string, link: string = "" ) =>
{
    const email = {
        body: {
            name: userName,
            intro: "Welcome to QuickBite! 🍔 We're excited to have you join our community and can't wait to deliver your favorite meals.",
            action: {
                instructions: "To verify your email address, use the verification code below:",
                button: {
                    color: "#FF6B35",
                    text: token,
                    link,
                },
            },
            outro: "This verification code will expire in 10 minutes.\n\nIf you didn't create a QuickBite account, you can safely ignore this email.\n\nNeed help? Simply reply to this email or contact our support team—we're always happy to assist you.\n\nHappy ordering!\nThe QuickBite Team 🍕",
        },
    };
    const mailOptions = {
        from: `"QuickBite" <${ process.env.EMAIL as string }>`,
        to: userEmail,
        subject: "QuickBite Account Verification",
        html: mailGenerator.generate( email ),
        text: mailGenerator.generatePlaintext( email ),
    }
    try
    {
        await transporter.sendMail( mailOptions );
        logger.info( `Verification email sent `, { to: userEmail } );
    } catch ( err )
    {
        logger.error( "Failed to send verification email", {
            to: userEmail,
            error: err instanceof Error ? err.message : "Unknown error",
        } );
        throw err instanceof Error ? err : new Error( "Failed to send verification email" );
    }
}

const sendForgotPasswordnEmail = async ( userEmail: string, userName: string, link: string ) =>
{
    const email = {
        body: {
            name: userName,
            intro:
                "We received a request to reset the password for your QuickBite account.",
            action: {
                instructions:
                    "Click the button below to create a new password. If the button doesn't work, you can copy and paste the link into your browser.",
                button: {
                    color: "#FF6B35",
                    text: "Reset Password",
                    link: link,
                },
            },
            outro:
                "This password reset link will expire in 15 minutes.\n\nIf you didn't request a password reset, you can safely ignore this email. Your account will remain secure, and no changes will be made unless you complete the reset process.\n\nIf you need any assistance, simply reply to this email or contact our support team.\n\nThanks,\nThe QuickBite Team 🍔",
        },
    };

    const mailOptions = {
        from: `"QuickBite" <${ process.env.EMAIL as string }>`,
        to: userEmail,
        subject: "QuickBite - Reset Your Password",
        html: mailGenerator.generate( email ),
        text: mailGenerator.generatePlaintext( email ),
    };
    try
    {
        await transporter.sendMail( mailOptions );
        logger.info( `forget password email sent `, { to: userEmail } );
    } catch ( err )
    {
        logger.error( "Failed to send forget password email", {
            to: userEmail,
            error: err instanceof Error ? err.message : "Unknown error",
        } );
        throw err instanceof Error ? err : new Error( "Failed to send forget password email" );
    }
}

const sentPasswordChangedMail = async ( userEmail: string, userName: string ) =>
{
    const email = {
        body: {
            name: userName,
            intro:
                "Your QuickBite account password has been changed successfully.",
            outro:
                "If you made this change, no further action is required.\n\nIf you did not change your password, your account may be at risk. Please reset your password immediately or contact our support team for assistance.\n\nThanks,\nThe QuickBite Team 🍔",
        },
    };

    const mailOptions = {
        from: `"QuickBite" <${ process.env.EMAIL as string }>`,
        to: userEmail,
        subject: "QuickBite - Your Password Has Been Changed",
        html: mailGenerator.generate( email ),
        text: mailGenerator.generatePlaintext( email ),
    };
    try
    {
        await transporter.sendMail( mailOptions );
        logger.info( `change password successfully  email sent `, { to: userEmail } );
    } catch ( err )
    {
        logger.error( "Failed to send successfully change password email", {
            to: userEmail,
            error: err instanceof Error ? err.message : "Unknown error",
        } );
        throw err instanceof Error ? err : new Error( "Failed to send successfully change   password email" );
    }
}




const sentOrderConfirmedMail = async ( userEmail: string, userName: string, orderTrackingLink: string = "" ) =>
{
    const email = {
        body: {
            name: userName,
            intro:
                "Thanks for your order! 🎉 We've received it successfully and have sent it to the restaurant for confirmation.",

            action: {
                instructions:
                    "You can view your order status and track its progress at any time by clicking the button below.",
                button: {
                    color: "#FF6B35",
                    text: "View Order",
                    link: orderTrackingLink,
                },
            },

            outro:
                "We'll keep you updated as your order progresses—from confirmation to preparation, out for delivery, and finally delivered.\n\nIf you have any questions or need assistance, our support team is here to help.\n\nThank you for choosing QuickBite. We hope you enjoy your meal!\n\nThe QuickBite Team 🍔",
        },
    };

    const mailOptions = {
        from: `"QuickBite" <${ process.env.EMAIL }>`,
        to: userEmail,
        subject: "🎉 Your QuickBite Order Has Been Confirmed",
        html: mailGenerator.generate( email ),
        text: mailGenerator.generatePlaintext( email ),
    };
    try
    {
        await transporter.sendMail( mailOptions );
        logger.info( `order confirmed email sent `, { to: userEmail } );
    } catch ( err )
    {
        logger.error( "Failed to send order confirmed email", {
            to: userEmail,
            error: err instanceof Error ? err.message : "Unknown error",
        } );
        throw err instanceof Error ? err : new Error( "Failed to send order confirmed email" );
    }
}

export
{
    sendVerificationEmail,
    sendForgotPasswordnEmail,
    sentPasswordChangedMail,
    sentOrderConfirmedMail
}