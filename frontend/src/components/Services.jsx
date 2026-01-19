import { TbTruckDelivery } from "react-icons/tb";
import { MdSecurity } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";

const Services = () => {
  return (
    <section className="py-[9rem] bg-white dark:bg-gray-900">
      <div className="max-w-[120rem] mx-auto px-[3.2rem]">
        <div className="grid grid-cols-3 gap-[4.8rem] max-md:grid-cols-1">
          <div className="w-auto h-[30rem] flex flex-col justify-center items-center bg-[#F6F8FA] dark:bg-gray-800 text-center rounded-[2rem] shadow-sm transition-all hover:scale-105 duration-300">
            <div className="flex flex-col items-center">
              <TbTruckDelivery className="w-[8rem] h-[8rem] p-[2rem] rounded-full bg-white text-[#5138ee]" />
              <h3 className="mt-[1.4rem] text-[2rem] text-[#1d1d1d] dark:text-white font-medium">Super Fast and Free Delivery</h3>
            </div>
          </div>

          <div className="w-auto h-[30rem] flex flex-col justify-center items-center gap-[4rem] bg-transparent shadow-none">
            <div className="bg-[#F6F8FA] dark:bg-gray-800 flex flex-row flex-1 justify-center items-center rounded-[2rem] shadow-sm w-full transition-all hover:scale-105 duration-300">
              <div className="flex flex-row justify-center items-center gap-[1rem]">
                <MdSecurity className="w-[8rem] h-[8rem] p-[2rem] rounded-full bg-white text-[#5138ee]" />
                <h3 className="mt-[1.4rem] text-[2rem] text-[#1d1d1d] dark:text-white font-medium">Genuine Wellness Products</h3>
              </div>
            </div>
            <div className="bg-[#F6F8FA] dark:bg-gray-800 flex flex-row flex-1 justify-center items-center rounded-[2rem] shadow-sm w-full transition-all hover:scale-105 duration-300">
              <div className="flex flex-row justify-center items-center gap-[1rem]">
                <GiReceiveMoney className="w-[8rem] h-[8rem] p-[2rem] rounded-full bg-white text-[#5138ee]" />
                <h3 className="mt-[1.4rem] text-[2rem] text-[#1d1d1d] dark:text-white font-medium">Money-back Guaranteed</h3>
              </div>
            </div>
          </div>

          <div className="w-auto h-[30rem] flex flex-col justify-center items-center bg-[#F6F8FA] dark:bg-gray-800 text-center rounded-[2rem] shadow-sm transition-all hover:scale-105 duration-300">
            <div className="flex flex-col items-center">
              <RiSecurePaymentLine className="w-[8rem] h-[8rem] p-[2rem] rounded-full bg-white text-[#5138ee]" />
              <h3 className="mt-[1.4rem] text-[2rem] text-[#1d1d1d] dark:text-white font-medium">Super Secure Payment System</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
