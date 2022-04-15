import { useState } from 'react'

const content = {
  "en-US": {
    name: "Name",
    company: "Company",
    phone: "Phone Number",
    subject: "Subject",
    email: "Email Address",
    message: "Message",
    submit: "Send",
    confirmation: "Your Inquiry has been submitted. We'll try to get back to you shortly. Thanks!",
  }, 
  "id-ID": {
    name: "Nama",
    company: "Perusahaan",
    phone: "Nomor telepon",
    subject: "Subjek",
    email: "Alamat email",
    message: "Pesan",
    submit: "Kirim",
    confirmation: "Pesan anda telah terkirim. Kami akan meresponnya dalam jangka waktu dekat. Terima Kasih!",
  }
}

export default function ContactForm({locale}) {
  const localeContent = content[locale] || content['en-US'];
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => { 
    e.preventDefault();
    
    const data = {
      name,
      company,
      phoneNumber,
      email,
      subject,
      message
    }

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (res.status === 200) {
      console.log('Response succeeded!')
      setSubmitted(true)
      setName('');
      setCompany('');
      setPhoneNumber('');
      setSubject('');
      setEmail('')
      setMessage('')
    }

  }

  if(submitted){
    return (
      <div className='pr-24 text-lg'>{localeContent.confirmation}</div>
    )
  } else {
    return (
      <div className="flex flex-col md:grid md:grid-cols-2 md:gap-x-24 gap-y-16">
        <label className="block">
          <span className=" <ContactForm locale={locale}/> text-gray-700">{localeContent.name}</span>
          <input
            type="text"
            className="
                      mt-0
                      block
                      w-full
                      px-0.5
                      bg-transparent
                      border-0 border-b-2 border-gray-700
                      focus:ring-0 focus:border-black
                    "
            onChange={(e)=>{setName(e.target.value)}}
            value={name}
          />
        </label>
        <label className="block">
          <span className="text-base text-gray-700">{localeContent.company}</span>
          <input
            type="text"
            className="
                      mt-0
                      block
                      w-full
                      px-0.5
                      bg-transparent
                      border-0 border-b-2 border-gray-700
                      focus:ring-0 focus:border-black
                    "
            onChange={(e)=>{setCompany(e.target.value)}}
            value={company}
          />
        </label>
        <label className="block">
          <span className="text-base text-gray-700">{localeContent.email}</span>
          <input
            type="text"
            className="
                      mt-0
                      block
                      w-full
                      px-0.5
                      bg-transparent
                      border-0 border-b-2 border-gray-700
                      focus:ring-0 focus:border-black
                    "
            onChange={(e)=>{setEmail(e.target.value)}}
            value={email}
          />
        </label>
        <label className="block">
          <span className="text-base text-gray-700">{localeContent.phone}</span>
          <input
            type="text"
            className="
                      mt-0
                      block
                      w-full
                      px-0.5
                      bg-transparent
                      border-0 border-b-2 border-gray-700
                      focus:ring-0 focus:border-black
                    "
            onChange={(e)=>{setPhoneNumber(e.target.value)}}
            value={phoneNumber}
          />
        </label>

        <label className="block">
          <span className="text-base text-gray-700">{localeContent.subject}</span>
          <input
            type="text"
            className="
                      mt-0
                      block
                      w-full
                      px-0.5
                      bg-transparent
                      border-0 border-b-2 border-gray-700
                      focus:ring-0 focus:border-black
                    "
            onChange={(e)=>{setSubject(e.target.value)}}
            value={subject}
          />
        </label>

        <label className="block col-span-2">
          <span className="text-base text-gray-700">{localeContent.message}</span>
          <textarea
            className="block w-full mt-1 bg-transparent border-gray-800 border rounded-md shadow-sm focus:border-black focus:ring focus:ring-indigo-700 focus:ring-opacity-50"
            rows="3"
            onChange={(e)=>{setMessage(e.target.value)}}
            value={message}
          ></textarea>
        </label>

        <input type='submit' className='py-3 text-base border border-black rounded-xl hover:bg-blue-500 hover:bg-opacity-50 hover:cursor-pointer' onClick={(e)=>{handleSubmit(e)}} value={localeContent.submit} />
      </div>
    )
  }
}
