"use client";

import { motion } from "framer-motion";

const LetterComponent = () => {
  return (
    <div
      className="min-h-screen py-20 px-4"
      style={{ backgroundColor: "var(--pink-light)" }}
    >
      <div className="container mx-auto max-w-3xl">
        <h2
          className="text-4xl md:text-5xl mb-12 text-center romantic-text"
          style={{ color: "var(--pink-dark)" }}
        >
          A Letter For You
        </h2>

        <motion.div
          className="paper-texture p-8 md:p-12 rounded-lg transform rotate-1"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          whileHover={{ rotate: 0, transition: { duration: 0.5 } }}
        >
          <div
            className="relative elegant-text text-gray-800 leading-relaxed"
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.8",
            }}
          >
            {/* Small decorative element */}
            <div className="absolute -top-4 -left-4 w-12 h-12 text-3xl text-pink-500 opacity-50">
              ❦
            </div>

            <p className="mb-4 text-justify">My dearest Lovey,</p>

            <p className="mb-4 text-justify">
              Hindi ko alam pano sisimulan pero i'm really happy kasi nandyan ka
              at eto nanga birthday mona hehe. i really love you so much lovey
              thats why i created this website for you. and phase 1 palang to ng
              regalo ko hehe mag sisimula lahat mamaya bago tayo umalis.
            </p>

            <p className="mb-4 text-justify">
              i already said this before but you know naman how much i love you
              diba? kahit na patanga tanga. you always forgive me. you help me a
              lot in this journey of my life. lagi mong pinapakita kung gano ako
              ka importante ngayon papakita ko naman kung gano ka important sa
              buhay ko.
            </p>

            <p className="mb-4 text-justify">
              isa kang blessing sa buhay ko lovey because you change me to a
              better person. kahit dahan dahan lang atleast diba may progress?
              palagi kong tatandaan na kung gaano kita kamahal. pasaway talaga
              ako e hehe. sorry lab ha kung lagi akong pa2lig2lig pero i promise
              na ginagawa ko best ko for you to be happy. malapit na tayo mag
              dalawang taon lovey ang saya kasi kasama kita sa lahat ng hirap
              pagod.
            </p>

            <p className="mb-4 text-justify">
              eto lang masasabi ko lovey. kung mawalan man ng spark sa pag-ibig
              natin. ibabalik ko pero i know naman na hindi lahat ng pag-ibig
              dapat may spark kasi i know na ikaw lang ang love ko kung mawala
              man yung love na yon and masasabi kolang talaga is ikaw parin ang
              pipiliin ko kahit sa anumang state ng sitwasyon. it will always
              you love.
            </p>

            <p className="mb-4 text-justify">
              Choosing you to be my forever is the greatest decision i have ever
              made.
            </p>

            <p className="mb-4 text-justify">
              Happy birthday, my love. May this year bring you as much joy as
              you've brought to me.
            </p>

            <p className="text-right mt-8">Forever yours,</p>
            <p
              className="text-right romantic-text text-2xl"
              style={{ color: "var(--pink-dark)" }}
            >
              Jeremiah
            </p>

            {/* Small decorative element */}
            <div className="absolute -bottom-4 -right-4 w-12 h-12 text-3xl text-pink-500 opacity-50 transform rotate-180">
              ❦
            </div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="w-16 h-16 absolute -mt-8 ml-4"
          initial={{ opacity: 0, rotate: -30 }}
          animate={{ opacity: 0.8, rotate: -25 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <img
            src="/images/bebe6.jpg"
            alt="Decorative heart"
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default LetterComponent;
