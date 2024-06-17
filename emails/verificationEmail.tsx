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
    username: string;
    email: string;
    verify_code: string
}


export default function verificationEmail({username, email, verify_code}: verificationEmailProps){
    return(
        <Html>
            <Head>
                <title>Verification code</title>
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
                        Go to the link <Link href={`http://localhost:3000/sign-up/verify-email/${username}?email=${email}`}>Go the the verify page</Link> and paste the code
                    </Text>
                </Row>
            </Section>

        </Html>
    )
}