export type ContactValues = { name:string; email:string; subject:string; message:string; website:string };
export type ContactErrors = Partial<Record<keyof ContactValues,string>>;
export function validateContact(values:ContactValues):ContactErrors {
  const errors:ContactErrors={};
  if(values.name.trim().length<2)errors.name='Please enter at least 2 characters.';
  else if(values.name.trim().length>80)errors.name='Keep your name under 80 characters.';
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())||values.email.length>254)errors.email='Please enter a valid email address.';
  if(values.subject.trim().length>120)errors.subject='Keep the subject under 120 characters.';
  if(values.message.trim().length<20)errors.message='Please write at least 20 characters.';
  else if(values.message.trim().length>6000)errors.message='Keep the message under 6,000 characters.';
  if(values.website)errors.website='The website field should be empty.';
  return errors;
}
export function buildContactParams(values:ContactValues){
  const name=values.name.trim(),email=values.email.trim(),subject=values.subject.trim()||'Portfolio enquiry';
  return { to_email:'kumbharprashant494@gmail.com',from_name:name,from_email:email,reply_to:email,subject,message:`Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${values.message.trim()}` };
}
