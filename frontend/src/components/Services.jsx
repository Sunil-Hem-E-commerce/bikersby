import { TbTruckDelivery } from "react-icons/tb";
import { MdSecurity } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";

const Services = () => {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Card 1 */}
          <div className="bg-[#f8fafc] dark:bg-gray-800 rounded-3xl p-12 text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group h-[30rem] flex flex-col justify-center items-center">
            <div className="bg-white p-6 rounded-full text-indigo-600 mb-6 shadow-md group-hover:scale-110 transition-transform">
              <TbTruckDelivery className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Super Fast Delivery</h3>
            <p className="text-slate-500">Free shipping on orders over $50</p>
          </div>

          {/* Card 2 - Split Column */}
          <div className="grid grid-rows-2 gap-8 h-[30rem]">
            <div className="bg-[#f8fafc] dark:bg-gray-800 rounded-3xl p-6 flex items-center justify-center gap-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="bg-white p-4 rounded-full text-indigo-600 shadow-md group-hover:scale-110 transition-transform">
                <MdSecurity className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Non-Contact Shipping</h3>
            </div>
            
            <div className="bg-[#f8fafc] dark:bg-gray-800 rounded-3xl p-6 flex items-center justify-center gap-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="bg-white p-4 rounded-full text-indigo-600 shadow-md group-hover:scale-110 transition-transform">
                <GiReceiveMoney className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Money-back Guaranteed</h3>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#f8fafc] dark:bg-gray-800 rounded-3xl p-12 text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group h-[30rem] flex flex-col justify-center items-center">
            <div className="bg-white p-6 rounded-full text-indigo-600 mb-6 shadow-md group-hover:scale-110 transition-transform">
              <RiSecurePaymentLine className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Super Secure Payment</h3>
            <p className="text-slate-500">100% secure payment gateways</p>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Services;
