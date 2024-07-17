# Mate - A Social Next.js App
It's going to be a full stack social Next.js App

***PRE Released.*** <a href="https://www.facebook.com/100054266981639/videos/1316153459222949/">Show video</a>

![Watch the video](/public/assets/mate_logo.png)

## Features of the Mate
- Sign up users with verify email
- Resend email
- "Forgot Password", if the user is an admin, email entry is not required (auto-detection). Otherwise, entering the email is mandatory.
- Necessary ratelimit included
- Update password
- Chat with mates.
- Protected from invalid user operations.
- Middlewares included perfectly.

## Authentication functionality:
If the user does not verify their email during the sign-up process, upon login, they will be redirected to verify their email. The user cannot log in until they have verified their email.

During sign-up, if a user enters their name and email, then navigates to the password section and returns to the name and email section, they can see their inputs. This will provide the user with the best user experience.

## Some of Security Algorithm:
* Once a user resets their password, they cannot update or reset it again for 15 days.
* Users must verify their email to reset their password.
* Users cannot skip any requirements. 😑
* After verifying their email, users must change their password within 10 minutes.
* If a user leaves or loses connection after verifying their email, the 10-minute timer will continue running. If they return to reset their password after this time has expired, they must verify their email again.
* Users are allowed 4 attempts to reset their password within rate limits. This means they can request a verification code twice and hit the verify code endpoint twice. Additional attempts will result in the user being blocked for 3 days.

## Chat 
* aggregation pipeline used.

## More features will be coming soon:
- Add friend
- Share your thoughts
- Add other social links in your profile
- Profile view
- Logged in devices
- Notifications
- Save loged out accounts in login page
- And more updates
- Responsive (currently Mate is not responsive)

Mate's algorithm is standard and secure. 
The algorithm makes the code easy to understand.
Algorithm will go live soon once development is completed. 
Development of Mate is temporarily on hold now. Updates will resume after 1.5 months.

## Packages:

```
npm i mongoose
```
```
npm i jsonwebtoken
```
```
npm i --save-dev @types/bcryptjs
```
```
npm install react-hot-toast
```
```
npm i @hookform/resolvers
```
```
npm i zod
```
```
npm i axios
```
```
npm install resend
```
```
npm install react-hook-form
```
```
npm install @react-email/components
```
```
npm i @upstash/redis
```
```
npm i @upstash/ratelimit
```
```
npm i uuid
```
