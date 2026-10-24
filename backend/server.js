const express = require("express");
const dotenv = require("dotenv");
const sgMail = require("@sendgrid/mail");
const cors = require("cors");


// Load environment variables
dotenv.config();


const app = express();

const PORT = process.env.PORT || 3000;


// ==================== SENDGRID ====================

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


// ==================== MIDDLEWARE ====================

// Allow frontend running on port 5500
app.use(cors({
    origin: [
        "http://localhost:5500",
        "http://127.0.0.1:5500"
    ],
    methods: ["POST"],
    allowedHeaders: ["Content-Type"]
}));


// Read JSON request body
app.use(express.json());


// Serve files from public folder if needed
app.use(express.static("public"));


// ==================== SUBSCRIBE ====================

app.post("/subscribe", async (req, res) => {

    const { email } = req.body;


    console.log("=================================");
    console.log("Subscription request received");
    console.log("Email:", email);
    console.log("=================================");


    // ==================== CHECK EMAIL ====================

    if (!email) {

        return res.status(400).json({

            success: false,

            message: "Email address is required."

        });

    }


    // ==================== VALIDATE EMAIL ====================

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        return res.status(400).json({

            success: false,

            message: "Please enter a valid email address."

        });

    }


    // ==================== EMAIL MESSAGE ====================

    const message = {

        // Subscriber's email
        to: email,

        // Verified SendGrid sender
        from: process.env.SENDGRID_FROM_EMAIL,

        subject: "Welcome to DEV@Deakin!",


        // Plain text version
        text: `
Hello!

Thank you for subscribing to DEV@Deakin.

You are now subscribed to our newsletter.

We look forward to sharing more programming,
web development and technology content with you.

Regards,
DEV@Deakin
        `,


        // HTML version
        html: `
            <!DOCTYPE html>

            <html>

            <head>

                <meta charset="UTF-8">

                <title>Welcome to DEV@Deakin</title>

            </head>

            <body style="
                margin: 0;
                padding: 0;
                background-color: #f3f4f6;
                font-family: Arial, sans-serif;
            ">

                <div style="
                    max-width: 600px;
                    margin: 40px auto;
                    background-color: white;
                    padding: 35px;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                ">

                    <h1 style="
                        color: #111827;
                        text-align: center;
                    ">
                        Welcome to DEV@Deakin!
                    </h1>


                    <p style="
                        color: #374151;
                        font-size: 16px;
                        line-height: 1.6;
                    ">
                        Hello!
                    </p>


                    <p style="
                        color: #374151;
                        font-size: 16px;
                        line-height: 1.6;
                    ">
                        Thank you for subscribing to DEV@Deakin.
                    </p>


                    <p style="
                        color: #374151;
                        font-size: 16px;
                        line-height: 1.6;
                    ">
                        You are now subscribed to our newsletter.
                    </p>


                    <p style="
                        color: #374151;
                        font-size: 16px;
                        line-height: 1.6;
                    ">
                        We look forward to sharing more programming,
                        web development and technology content with you.
                    </p>


                    <p style="
                        color: #374151;
                        font-size: 16px;
                        line-height: 1.6;
                    ">
                        Regards,<br>
                        <strong>DEV@Deakin</strong>
                    </p>

                </div>

            </body>

            </html>
        `

    };


    // ==================== SEND EMAIL ====================

    try {

        const response = await sgMail.send(message);


        console.log(
            "SendGrid status:",
            response[0].statusCode
        );

        console.log(
            "Welcome email sent successfully to:",
            email
        );


        return res.status(202).json({

            success: true,

            message:
                "Subscription successful! Welcome email sent."

        });

    }


    // ==================== ERROR ====================

    catch (error) {

        console.error("SendGrid error:");

        if (error.response) {

            console.error(
                error.response.body
            );

        } else {

            console.error(
                error.message
            );

        }


        return res.status(500).json({

            success: false,

            message:
                "Unable to send the welcome email."

        });

    }

});


// ==================== START SERVER ====================

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});