
export function Main() {
   return (
    <div className="home">
      <main className="p-2">
        <h1 className="text-3xl text-center py-4">Hi, I&apos;m Thomas</h1>
        <div className="hero flex justify-center">
          <img src={"/images/me_solsiden.jpg"} alt="Me in Elvehavn, Trondheim" className="rounded-full" width={250} height={250} />
        </div>
        <h2 className="text-2xl text-center py-6">Clarinettist and <span className="bg-gray-700 ml-1 px-3 py-1 text-white rounded-full italic">web-developer</span></h2>
        <section className="flex-column place-items-center my-10 w-100 md:w-[680px] lg:w-[980px] mx-auto">
          <h3 className="text-3xl">About the TSO &amp; Opera</h3>
          <img src={"/images/tso.jpg"} alt="TSO full orchestra" className="rounded-3xl py-2 mb-2 w-90 md:w-full" width={1665} height={840} />
          <p>I&apos;m a clarinettist in the Trondheim Symphony Orchestra & Opera. Our concert venue is Olavshallen. Thanks to our collaboration with the Trondheim Soloists the orchestra has 90 members for most of our productions.</p>
          <h3 className="text-3xl mt-3">TSO Opera</h3>
          <img src={"/images/tso_opera.jpg"} alt="From TSO's production of Faust" className="rounded-3xl py-2 m-2 w-90 md:w-full" width={1500} height={600} />
          <p>In recent years, TSO has put on at least one major opera-production every year. From the 2016-17 season we also have the TSO Vocal Ensemble in place, participating in the opera productions, and also giving their own concerts.</p>
          <h3 className="text-3xl mt-3">TSO Open Day</h3>
          <img src={"/images/oh.jpg"} alt="From TSO Open Day" className="rounded-3xl py-2 m-2 w-90 md:w-full" width={450} height={338} />
          <p>Once every year we invite our audience to an Open Day for the whole family.
            The children can listen to small ensembles, try out different instruments, write their own music, and even conduct a small ensemble.
            Finally, everyone is invited to a family-concert with the full orchestra.</p>
        </section>
      </main>
    </div>
  );
}