
function About() {
   return (
        <div className="py-3 px-3 md:px-4 lg:px-6">
            <h1 className="text-center py-2">About me</h1>
            <img src={"/images/clrnets2.jpg"} alt="18th century clarinets" width={150} height={250} className="float-right rounded-3xl ml-2"/>
            <p>Thomas Norup Jensen (1967) started playing
                the clarinet at the age of 7.
                He has his background from wind bands, and he was a member of The Norwegian National Wind Band from 1984 to 1986.</p>
            <p className="py-2">He studied at the Norwegian State Academy 1989-93,
                under Professor Hans Christian Bræin.
                He has attended masterclasses
                with Michel Arrignon and Alain Damiens,
                and he also studied with M. Damiens in Paris.</p>
            <p className="py-2">From January 1994 he is the Principal Clarinettist of the
                Trondheim Symphony Orchestra & Opera,
                and he was teaching at the Music Institute at
                NTNU University from 1995 to 2010.</p>
            <h2 className="text-xl py-2">Chamber music performances include: </h2>
            <ul>
                <li><span className="italic">Messiaen : Quatuor pour la Fin du Temps</span> at Trondheim Chamber Music Festival (1999) and also at Nordland Music Festival (2000)</li>
                <li><span className="italic">Lindberg : Steamboat Willy</span> in Trondheim Chamber Music Festival (2006)</li>
                <li><span className="italic">Mozart : Piano Quintet</span>, featuring Radovan Vlatkovich (2006)</li>
                <li><span className="italic">Ravel: Introduction and Allegro</span> in Røros Winter Festival (2010)</li>
                <li><span className="italic">Beethoven : Trio op.11</span> in Røros Winter Festival (2010)</li>
            </ul>
            <h2 className="text-xl py-2">Soloist performances with the Trondheim Symphony Orchestra include:</h2>
            <ul>
                <li><span className="italic">Nielsen: Clarinet Concerto</span> (1996)</li>
                <li><span className="italic">Rossini : Theme and Variations</span> (1999)</li>
                <li><span className="italic">Mozart : Sinfonia Concertante</span> (2000)</li>
                <li><span className="italic">Strauss : Duet-Concertino</span>, conducted by Daniel Harding (2010)</li>
            </ul>
            <h2 className="text-xl py-2">Other soloist performances include:</h2>
            <ul>
                <li><span className="italic">Weber: Clarinet Concerto No.1</span> with Sør-Trøndelag Orkesterforening (1998)</li>
                <li><span className="italic">Mozart : Clarinet Concerto</span> on basset-clarinet conducted by Rune Halvorsen on his 40th birthday (2006)</li>
                <li><span className="italic">Weber : Concertino</span> with Sør-Trøndelag Orkesterforening (2013)</li>
            </ul>
        </div>
    )
}
export default About;
