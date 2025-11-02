import styles from './page.module.css';

export default function ContactPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Contact Us</h1>
      <div className={styles.content}>
        <p>Have questions? We'd love to hear from you!</p>
        
        <div className={styles.contactInfo}>
          <h2>Get in Touch</h2>
          <p><strong>Email:</strong> support@mystore.com</p>
          <p><strong>Phone:</strong> +1 (555) 123-4567</p>
          <p><strong>Address:</strong> 123 Store Street, Shopping District, NY 10001</p>
        </div>

        <div className={styles.hours}>
          <h2>Business Hours</h2>
          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
          <p>Saturday: 10:00 AM - 4:00 PM</p>
          <p>Sunday: Closed</p>
        </div>
      </div>
    </main>
  );
}
