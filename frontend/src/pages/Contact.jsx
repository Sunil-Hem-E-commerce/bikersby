import { useUserContext } from "../context/user_context";

const Contact = () => {
  const { user } = useUserContext();
  const isAuthenticated = !!user;

  return (
    <section className="pt-[9rem] pb-[5rem] text-center">
      <h2 className="text-[3.8rem] font-semibold mb-[6rem] capitalize text-[#1d1d1d] dark:text-white">Contact page</h2>

      <iframe
        title="Healthy Living Nepal"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.254905981462!2d85.3151532!3d27.6785154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19edf4545bd3%3A0xe5c043330fc58a7d!2sImpact%20Hub%20Kathmandu!5e0!3m2!1sen!2snp!4v1699202985853!5m2!1sen!2snp"
        width="90%"
        height="400"
        style={{ border: "0" }}
        allowFullscreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <div className="mt-[6rem] max-w-[50rem] mx-auto px-4">
        <div className="max-w-[50rem] mx-auto">
          <form
            action="https://formspree.io/f/maygkdqq"
            method="POST"
            className="flex flex-col gap-[3rem]"
          >
            <input
              type="text"
              placeholder="username"
              name="username"
              value={isAuthenticated ? user.name : ""}
              required
              autoComplete="off"
              className="px-[2.4rem] py-[1.6rem] border border-gray-300 rounded-[0.8rem] shadow-sm text-[1.6rem] outline-none focus:border-[#8490ff]"
            />

            <input
              type="email"
              name="Email"
              value={isAuthenticated ? user.email : ""}
              placeholder="Email"
              autoComplete="off"
              required
              className="px-[2.4rem] py-[1.6rem] border border-gray-300 rounded-[0.8rem] shadow-sm text-[1.6rem] outline-none focus:border-[#8490ff]"
            />

            <textarea
              name="Message"
              cols="30"
              rows="10"
              required
              autoComplete="off"
              placeholder="Enter you message"
              className="px-[2.4rem] py-[1.6rem] border border-gray-300 rounded-[0.8rem] shadow-sm text-[1.6rem] outline-none focus:border-[#8490ff] resize-y"
            ></textarea>

            <input 
              type="submit" 
              value="send" 
              className="bg-[rgb(98,84,243)] text-white px-[3.2rem] py-[1.4rem] uppercase text-[1.8rem] cursor-pointer transition-all duration-200 border border-[rgb(98,84,243)] hover:bg-white hover:text-[rgb(98,84,243)] hover:scale-90 rounded-[0.8rem]"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
