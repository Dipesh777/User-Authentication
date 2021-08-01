import React from 'react'


const Home = (props) => {
  return (
    <div className='p-3 w-100'>
      <h1 className='text-capitalize'>welcome to user authentication</h1>
      <img src="Home_Img.png" alt="Auth Image" className='p-3' />
      <div className='d-flex p-3'>

        <div className='border p-2 me-4'>
          <h3 className='mb-4 p-2'>What Is Authentication?</h3>
          <p>Authentication is the act of validating that users are whom they claim to be. This is the first step in any security process. </p>
          <p>Complete an authentication process with:</p>
          <ul>
            <li><b>Passwords</b> Passwords. Usernames and passwords are the most common authentication factors. If a user enters the correct data, the system assumes the identity is valid and grants access.</li>
            <li><b>One-time pins</b> . Grant access for only one session or transaction</li>
            <li><b>Authentication apps</b> . Generate security codes via an outside party that grants access.</li>
            <li><b>Biometrics</b> . A user presents a fingerprint or eye scan to gain access to the system. </li>
          </ul>
          <p>In some instances, systems require the successful verification of more than one factor before granting access. This multi-factor authentication (MFA) requirement is often deployed to increase security beyond what passwords alone can provide.</p>
        </div>

        <div className='border p-2 ms-2'>
          <h3 className='mb-4 p-2'>What Is Authorization?</h3>
          <p>Authorization in system security is the process of giving the user permission to access a specific resource or function. This term is often used interchangeably with access control or client privilege.</p>
          <p>Giving someone permission to download a particular file on a server or providing individual users with administrative access to an application are good examples of authorization.</p>
          <p>In secure environments, authorization must always follow authentication. Users should first prove that their identities are genuine before an organization’s administrators grant them access to the requested resources.
          </p>
        </div>
      </div>

    </div>
  )
}

export default Home