import {
    Html,
    Head,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Link
} from "@react-email/components"

interface verificationEmailProps {
    email: string;
    verify_code: string
}


export default function verificationEmailForgetPassword({email, verify_code}: verificationEmailProps){
    return(
        <Html>
            <Head>
                <title>Verification code for reset password</title>
            </Head>
            <Preview>Here&apos;s is your verification code {verify_code}</Preview>
            <Section>
                <Row>
                    <Heading>Hello {email}</Heading>
                </Row>
                <Row>
                <Heading>Your Verification code: {verify_code}</Heading>
                </Row>
                <Row>
                    <Text>
                        Go to the link <Link href={`http://localhost:3000/forget-password/verify-email-to-reset-password?email=${email}`}>Go the the verify page</Link> and paste the code
                    </Text>
                </Row>
            </Section>

        </Html>
    )
}