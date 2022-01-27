
import { Formik , Form} from 'formik'
import {
    FormControl,
    FormLabel,
    Container, Input, Box, Heading, Stack,Divider
} from '@chakra-ui/react'


const Register   = () => {
    return (
        <Container>
            <Box padding='4' marginTop={'50%'} bgGradient='linear(to-l, #7928CA, #FF0080)'maxW='3xl'>
                <Stack spacing={6} padding={'10px'} align={'center'}>
                    <Heading  as='h3' size='lg'>
                        Register User
                    </Heading>
                </Stack>
                <Divider />
                <Formik initialValues={{username : '', password : ''}} onSubmit={() =>{}} >
                    {({values}) => (
                    <Form>
                        <FormControl>
                            <FormLabel htmlFor='username'>Username</FormLabel>
                            <Input id='email' type='text' />
                            {/*<FormHelperText>We'll never share your email.</FormHelperText>*/}
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='username'>Password</FormLabel>
                            <Input id='password' type='password' />
                            {/*<FormHelperText>We'll never share your email.</FormHelperText>*/}
                        </FormControl>
                    </Form>
                    )}
                </Formik>
            </Box>
        </Container>

    )


}

export default Register