const Contact = () => {
    return (
      <section id="contact" className="py-20 px-6 bg-black text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Contact</h2>
          <p className="text-lg text-gray-300 mb-10">
            Dites-nous tout sur votre événement. On vous répond vite et bien.
          </p>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm text-gray-400">Type d’événement</label>
                <select className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FF2EBC]">
                  <option>Mariage</option>
                  <option>Soirée privée</option>
                  <option>Événement professionnel</option>
                  <option>Autre</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-400">Date</label>
                <input type="date" className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00F0FF]" />
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-400">Lieu</label>
                <input type="text" placeholder="Ville, lieu exact..." className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FF2EBC]" />
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-400">Nombre de personnes</label>
                <input type="number" placeholder="Ex: 80" className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00F0FF]" />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-400">Message</label>
              <textarea rows="5" placeholder="Parlez-nous un peu de votre événement..." className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FF2EBC]"></textarea>
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 mt-4 bg-[#FF2EBC] text-white font-semibold rounded-md hover:bg-pink-600 transition"
            >
              Envoyer
            </button>
          </form>
        </div>
      </section>
    );
  };
  
  export default Contact;
  