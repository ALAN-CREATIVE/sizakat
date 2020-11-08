import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '../../components/Commons/BlankLayout'

const VERIFY_ACCOUNT = gql`
  mutation verifyAccount($token: String!) {
      verifyAccount(token: $token) {
          success
          errors
      }
  }
`

export default function ActivateAccountPage() {
    const router = useRouter()
    const [message, setMessage] = useState("")
    const [verifyAccount, { loading: mutationLoading }] = useMutation(VERIFY_ACCOUNT)
    const { token } = router.query

    useEffect(() => {
        if (token) {
            activateAccount()
        }
    }, [token])

    const activateAccount = async () => {
        try {
            const { data } = await verifyAccount({ variables: { token } })
            if (data.verifyAccount.success) {
                setMessage("Verifikasi akun berhasil!")
            } else {
                setMessage(`Verifikasi akun gagal. ${data.verifyAccount.errors.nonFieldErrors[0].message}`)
            }
        } catch (e) {
            setMessage(`Verifikasi akun gagal. ${e}`)
        }
    }

    return (
        <Layout>
            <div className="container">
                <Head>
                    <title>Activate Account</title>
                </Head>
                <div className="alert alert-primary" role="alert">
                    {mutationLoading && 'Verifying...'}
                    {!mutationLoading && message}
                    <br />
                    <Link href={`/login`}>
                        <a>{'Klik disini untuk login'}</a>
                    </Link>
                </div>
            </div>
        </Layout>
    )
}