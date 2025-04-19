const ContactUs = () => {
  return (
    <section className="mt-20 m-auto">
      <h3 className="text-center">Contact Us</h3>
      <form className="flex flex-col gap-2 max-w-[500px] m-auto">
        <input
          type="email"
          required
          placeholder="Your email here..."
          className="rounded-md"
        />
        <textarea
          required
          placeholder="Your message here..."
          className="rounded-md"
        />
        <button className="gradient-button-blue-purple">Submit</button>
      </form>
    </section>
  );
};

export default ContactUs;
