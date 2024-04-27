import "../../assets/css/testimonial.css";
/* eslint-disable react/no-unescaped-entities */

const Testimonial = () => {
  return (
    <div>
      <section className="text-gray-600 body-font mb-10">
        {/* main  */}
        <div className="container px-5 py-10 mx-auto">
          {/* Heading  */}
          <h1 className=" text-center text-4xl font-bold text-green-900 mb-4">
            Testimonial
          </h1>
          {/* para  */}
          <h2 className=" text-center text-2xl font-semibold mb-20">
            What our <span className=" text-green-500">customers</span> say
          </h2>

          <div className="flex flex-wrap -m-4">
            {/* Testimonial 1 */}
            <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src="https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                />
                <p className="leading-relaxed text-2xl">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Porro sapiente distinctio corrupti maiores, omnis cum! Quos,
                  quod molestiae! Dolore, voluptatum?
                </p>
                <span className="inline-block h-1 w-10 rounded bg-green-500 mt-6 mb-4" />
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-lg uppercase">
                  John Doe
                </h2>
                <p className="text-gray-500 text-lg">Senior Product Designer</p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src="https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                />
                <p className="leading-relaxed text-2xl">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Itaque maxime amet illum quisquam deserunt dicta reprehenderit
                  laborum similique fugit nihil.
                </p>
                <span className="inline-block h-1 w-10 rounded bg-green-500 mt-6 mb-4" />
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-lg uppercase ">
                  Jane Doe
                </h2>
                <p className="text-gray-500 text-lg">UI Develeoper</p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="lg:w-1/3 lg:mb-0 p-4">
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src="https://images.pexels.com/photos/2650090/pexels-photo-2650090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                />
                <p className="leading-relaxed text-2xl">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo,
                  necessitatibus? Illo error cupiditate voluptates nam, non
                  aspernatur eveniet minus dolore possimus nulla similique
                  quidem nobis?
                </p>
                <span className="inline-block h-1 w-10 rounded bg-green-500 mt-6 mb-4" />
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-lg uppercase">
                  Peter Parker
                </h2>
                <p className="text-gray-500 text-lg">CTO</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonial;
