export const Contact = ({ contact, link }: ContactProps) => {
  return (
    <div>
      <a href={link!} target="_blank">
        {contact}
      </a>
    </div>
  )
}

// types
type ContactProps = {
  contact: string
  link: string | null
}
