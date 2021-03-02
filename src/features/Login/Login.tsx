import React from 'react'
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid } from '@material-ui/core'
import { useFormik } from 'formik'
import { ErrorSnackbar } from '../../components/ErrorSnackbar/ErrorSnackbar'

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        onSubmit: (values) => {

        },
        validate: (values) => {
            
            const errors: FormikErrorType = {};

            if(!values.email) {
               errors.email = "Email is required!";
            } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Email is invalid!";
            }
            if(!values.password) {
                errors.password = "Password is required";
            } else if(values.password.length < 3) {
                errors.password = "Password is too short!"
            }

            return errors;
        }
    })
    return <Grid container justify="center">
        <Grid item xs={4}>
            <form>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                     <a href={'https://social-network.samuraijs.com/'}
                                target={'_blank'}>here
                     </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps("email")}
                        />
                        {(formik.errors.email && formik.touched.email) && <div style={{color: "red"}}>{formik.errors.email}</div>}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps("password")}
                        />
                        {(formik.errors.password && formik.touched.password) && <div style={{color: "red"}}>{formik.errors.password}</div>}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox {...formik.getFieldProps("rememberMe")} checked={formik.values.rememberMe} />}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}

