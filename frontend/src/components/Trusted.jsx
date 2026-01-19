const Trusted = () => {
  return (
    <section className="py-[9rem] bg-[#F6F8FA] dark:bg-gray-900">
      <div className="max-w-[120rem] mx-auto px-[3.2rem]">
        <h3 className="text-center capitalize text-[#1d1d1d] dark:text-white text-[2rem] font-bold">Trusted By 100+ Wellness Partners</h3>
        <div className="mt-[3.2rem] flex justify-between items-center max-md:grid max-md:grid-cols-2 max-md:text-center max-md:gap-4">
          <div className="flex justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
              alt="trusted-brands"
              className="min-w-[10rem] h-[10rem] object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <div className="flex justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/1200px-Tesla_Motors.svg.png"
              alt="trusted-brands"
              className="min-w-[10rem] h-[10rem] object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <div className="flex justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png"
              alt="trusted-brands"
              className="min-w-[10rem] h-[10rem] object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <div className="flex justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1200px-IBM_logo.svg.png"
              alt="trusted-brands"
              className="min-w-[10rem] h-[10rem] object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <div className="flex justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png"
              alt="trusted-brands"
              className="min-w-[10rem] h-[10rem] object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trusted;
