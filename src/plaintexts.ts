const plaintexts = [
  {
    id: "0",
    plaintext:
      "The feverish interest aroused at the meeting by Legrasse's tale, corroborated as it was by the statuette, is echoed in the subsequent correspondence of those who attended; although scant mention occurs in the formal publications of the society. Caution is the first care of those accustomed to face occasional charlatanry and imposture. Legrasse for some time lent the image to Professor Webb, but at the latter's death it was returned to him and remains in his possession, where I viewed it not long ago. It is truly a terrible thing, and unmistakably akin to the dream-sculpture of young Wilcox.",
    author: "H.P. Lovecraft",
    origin: "excerpt from *The Call of Cthulhu*",
  },
  {
    id: "1",
    plaintext:
      "Above these apparent hieroglyphics was a figure of evident pictorial intent, though its impressionistic execution forbade a very clear idea of its nature. It seemed to be a sort of monster, or symbol representing a monster, of a form which only a diseased fancy could conceive. If I say that my somewhat extravagant imagination yielded simultaneous pictures of an octopus, a dragon, and a human caricature, I shall not be unfaithful to the spirit of the thing. A pulpy, tentacled head surmounted a grotesque and scaly body with rudimentary wings; but it was the general outline of the whole which made it most shockingly frightful. Behind the figure was a vague suggestions of a Cyclopean architectural background",
    author: "H.P. Lovecraft",
    origin: "excerpt from *The Call of Cthulhu*",
  },
  {
    id: "2",
    plaintext:
      "Then Horton stopped walking. The speck-voice was talking! The voice was so faint he could just barley hear it. “Speak up, please” said Horton. He put his ear near it. “My friend,” came the voice, “you’re a very fine friend. You’ve helped all us folks on this dust speck no end. You’ve saved all our houses, our ceilings and floors. You’ve saved all our churches and grocery stores.” “You mean...” Horton gasped, “you have buildings there, too?” “Oh, yes,” piped the voice. “We most certainly do... “I know,” called the voice, “I’m too small to be seen but I’m mayor of a town that is friendly and clean. Our buildings, to you, would seem terribly small but to us, who aren’t big, they are wonderfully tall. My town is called Who-ville, for I am a Who and we Whos are all thankful and grateful to you.” And Horton called back to the Mayor of the town, “You’re safe now. Don’t worry. I won’t let you down.” ",
    author: "Dr. Seuss",
    origin: "excerpt from *Horton Hears a Who*",
  },
  {
    id: "3",
    plaintext:
      "And the Grinch, with his Grinch-feet ice cold in the snow, stood puzzling and puzzling, how could it be so? It came without ribbons. It came without tags. It came without packages, boxes or bags. And he puzzled and puzzled 'till his puzzler was sore. Then the Grinch thought of something he hadn't before. What if Christmas, he thought, doesn't come from a store. What if Christmas, perhaps, means a little bit more?",
    author: "Dr. Seuss",
    origin: "excerpt from *How the Grinch Stole Christmas*",
  },
  {
    id: "4",
    plaintext:
      "Every inch of wall space is covered by a bookcase. Each bookcase has six shelves, going almost to the ceiling. Some bookshelves are stacked to the brim with hardback books: science, maths, history, and everything else. Other shelves have two layers of paperback science fiction, with the back layer of books propped up on old tissue boxes or lengths of wood, so that you can see the back layer of books above the books in front. And it still isn't enough. Books are overflowing onto the tables and the sofas and making little heaps under the windows.",
    author: "Eliezer Yudkowsky",
    origin: "excerpt from *Harry Potter and the Methods of Rationality*",
  },
  {
    id: "5",
    plaintext:
      'Medicine-as-commerce is at the heart of each of these stories just as it is at the heart of some of the good trends and most of the bad ones. It is clear enough that biotech and pharmaceutical firms can work miracles. But it is also true that they can lean heavily on public funding and end up making a great deal of private profit. Even more troublesome are the rapidly growing investor-owned health plans. They go under many names, including health-maintenance organizations. Although some of these are not-for-profit, many have in common a basic strategy: selling "Product" to "Consumers" rather than providing care to patients.',
    author: "Paul Farmer",
    origin: "excerpt from *Pathologies of Power*",
  },
  {
    id: "6",
    plaintext:
      "I imagined the Death Messenger as an ugly old man with horns and ulcerous skin, burning yellow eyes and a gaping, toothless mouth that waited to feed ravenously on the souls that lined up in front of our apartment. Our open door was Saja's gaping mouth, my mother his tongue, sampling each person for the taste of death. The demon waiting to snatch me off to hell if I did not carry a red-packeted charm, Saja was the devil my father had preached about and, through my mother's chants and offerings, became more real to me than my father ever was.",
    author: "Nora Okja Keller",
    origin: "excerpt from *Comfort Woman*",
    notes: "The J is likely difficult to figure out.",
  },
  {
    id: "7",
    plaintext:
      "Mondays or Fridays, it doesn't matter, mornings always go by slow and this day especially. But lunchtime came finally and I got to get in line with the stay-at-school kids. Everything is fine until the nun who knows all the canteen kids by heart looks at me and says: You, who sent you here? And since I am shy, I don't say anything, just hold out my hand with the letter. This is no good, she says, till Sister Superior gives the okay. Go upstairs and see her. And so I went.",
    author: "Sandra Cisneros",
    origin: "excerpt from *The House on Mango Street*",
  },
  {
    id: "8",
    plaintext:
      "At a few minutes past the appointed hour Mrs. Trent entered, unannounced. She was a woman of about twenty-eight. She had a white, demure, saintlike face, smooth black hair, and lips so crimson and full that they seemed to be bursting with blood. Her tall, graceful body was most expensively attired. Kisses were exchanged between her and Mrs. Jameson. She bowed to the rest of the assembly, and stole a half glance and a smile at Faull. The latter gave her a queer look, and Backhouse, who lost nothing, saw the concealed barbarian in the complacent gleam of his eye.",
    author: "David Lindsay",
    origin: "excerpt from *A Voyage to Arcturus*",
    notes: "Courtesy of Diego",
  },
  {
    id: "9",
    plaintext:
      "He had a rich abundance of idle time, but it never hung heavy on his hands, for he interested himself in every new thing that was born into the universe of ideas, and studied it and experimented upon it at his house. One of his pet fads was palmistry. To another one he gave no name, neither would he explain to anybody what its purpose was, but merely said it was an amusement. In fact, he had found that his fads added to his reputation as a pudd'nhead; therefore he was growing chary of being too communicative about them.",
    author: "Mark Twain",
    origin: "excerpt from *Pudd'nhead Wilson*",
    notes: "From one of Jay's book collection",
  },
  {
    id: "10",
    plaintext:
      "She was stretched on her back beneath the pear tree soaking in the alto chant of the visiting bees, the gold of the sun, and the panting breath of the breeze when the inaudible voice of it all came to her. She saw a dust-bearing bee sink into the sanctum of a bloom; the thousand sister-calyxes arch to meet the love embrace and the ecstatic shiver of the tree from root to tiniest branch creaming in every blossom and frothing with delight. So this was marriage! She had been summoned to behold a revelation. Then Janie felt a pain remorseless sweet that left her limp and languid.",
    author: "Zora Neale Hurston",
    origin: "excerpt from *Their Eyes Were Watching God*",
  },
  {
    id: "11",
    plaintext:
      "The scientific soul of matter, its irreducible essence, was mass. Mass defined matter's resistance to motion, its inertia. Mass was unchangeable, \"conserved.\" It could be transferred from one body to another but could never be gained or lost. For Newton, mass defined quality of matter. In Newton's physics, mass provided the link between force and motion, and it provided the source of gravity. For Lavoisier, the persistence of mass, its accurate conservation, provided the foundation of chem}istry and offered a fruitful guide to discovery. If mass seems to disappear, look for it in new forms",
    author: "Frank Wilczek",
    origin: "excerpt from *The Lightness of Being*",
  },
  {
    id: "12",
    plaintext:
      "It seems probable to me, that God in the beginning formed matter in solid, massy, hard, impenetrable, moveable particles, of such sizes and figures, and with such other properties, and in such proportions to space, as most conducted to the ends for which He formed them; and that these primitive particles being solids, are incomparably harder than any porous bodies compounded of them, even so very hard, as never to wear or break in pieces; no ordinary power being able to divide what God Himself made one in the first creation.",
    author: "Sir Issac Newton",
    origin: "excerpt from *Opticks*",
  },
  {
    id: "13",
    plaintext:
      "Lo-lee-ta: the tip of the tongue taking a trip of three steps down the palate to tap, at three, on the teeth. Lo. Lee. Ta. She was Lo, plain Lo, in the morning, standing four feet ten in one sock. She was Lola in slacks. She was Dolly at school. She was Dolores on the dotted line. But in my arms she was always Lolita. Did she have a precursor? She did, indeed she did. In point of fact, there might have been no Lolita at all had I not loved, one summer, an initial girl-child. In a princedom by the sea. Oh when? About as many years before Lolita was born as my age was that summer. You can always count on a murderer for a fancy prose style. Ladies and gentlemen of the jury, exhibit number one is what the seraphs, the misinformed, simple, noble-winged seraphs, envied. Look at this tangle of thorns.",
    author: "Vladimir Nabokov",
    origin: "excerpt from *Lolita*",
    notes: "Courtesy of /u/double-indemnity from Reddit.",
  },
  {
    id: "14",
    plaintext:
      "Until a man is twenty-five, he still thinks, every so often, that under the right circumstances he could be the baddest motherfucker in the world. If I moved to a martial-arts monastery in China and studied real hard for ten years. If my family was wiped out by Colombian drug dealers and I swore myself to revenge. If I got a fatal disease, had one year to live, and devoted it to wiping out street crime. If I just dropped out and devoted my life to being bad. Hiro used to feel this way, too, but then he ran into Raven. In a way, this was liberating. He no longer has to worry about being the baddest motherfucker in the world. The position is taken.",
    author: "Neal Stephenson",
    origin: "excerpt from *Snowcrash*",
    notes: "Courtesy of /u/paiaw, from the top of /r/excerpts",
  },
  {
    id: "15",
    plaintext:
      "I wanted so badly to lie down next to her on the couch, to wrap my arms around her and sleep. Not fuck, like in those movies. Not even have sex. Just sleep together, in the most innocent sense of the phrase. But I lacked the courage and she had a boyfriend and I was gawky and she was gorgeous and I was hopelessly boring and she was endlessly fascinating. So I walked back to my room and collapsed on the bottom bunk, thinking that if people were rain, I was drizzle and she was hurricane.",
    author: "John Green",
    origin: "excerpt from *Looking for Alaska*",
    notes: "Courtesy of /u/extrachange from the top of /r/bookquotes",
  },
  {
    id: "16",
    plaintext:
      "In  the  specific  context  of  the  Rock - Paper - Scissors game,  the  replicator  equations  are  most  often  studied in the absence of mutation.  The dynamics in that case tend to exhibit one of three types of long-term behavior,  depending  on  a  parameter that  characterizes  how  far  the  game  is  from  being  a  zero-sum  game. The three types of behavior are:  (1) stable coexistence of all three species, (2) neutrally stable cycles that fill the whole state space, and (3) large-amplitude heteroclinic cycles in which each species in turn almost takes over the whole population and then almost goes extinct.",
    author: "Danielle  F.  P.  Toupo  and  Steven  H.  Strogatz",
    origin:
      "excerpt from the paper *Nonlinear Dynamics of the Rock-Paper-Scissors Game with Mutations*",
    notes: "Jenette's suggestion",
  },
  {
    id: "17",
    plaintext:
      '"Fool, prate not to me about covenants. There can be no covenants between men and lions, wolves and lambs can never be of one mind, but hate each other out and out and through. Therefore there can be no understanding between you and me, nor may there be any covenants between us, till one or other shall fall and glut grim Mars with his life\'s blood. Put forth all your strength; you have need now to prove yourself indeed a bold soldier and man of war. You have no more chance, and Pallas Minerva will forthwith vanquish you by my spear: you shall now pay me in full for the grief you have caused me on account of my comrades whom you have killed in battle."',
    author: "Homer",
    origin: "excerpt from *The Iliad*, translated by Samuel Butler",
  },
  {
    id: "18",
    plaintext:
      "When you're young, psychedelic is a primary color and a most mesmerizing high. Santa Monica was full of free multihued trips. The color-burst free love murals on Main Street seemed to come to vibrant cartoon life when I passed them. The whales and dolphins frolicked in the clouds and the sea lions and merry-go-round horsies turned cartwheels in the street. The spray-any-color-paint-on-the-spin-art creations at the pier were fifty-cent Jackson Pollock rainbow heroin hits that made your skin tingle and the grains of sand swell up and rise to the sky like helium balloons. Looking into the kaleidoscopic eyes of a scruffy Bukowski barfly sitting in the lotus position along with the bike trails fractured your soul into hundreds of disconnected psychedelic shards. Each sharp piece of your mind begging for sobriety.",
    author: "Paul Beatty",
    origin: "excerpt from *The White Boy Shuffle*",
  },
  {
    id: "19",
    plaintext:
      "Inside this box are crisp, versatile, little crackers with surprising big flavor. Why surprising? Because they have fifty percent less fat than our original Woven Wheats Wafers. That's why we call them Reduced Guilt. But really, a reduced fat snack still has to deliver on flavor and texture, right? This one does. And then some. Try right out of the box, topped with cheese, or as an accompaniment for soups or salad.",
    author: "Trader Joe's",
    origin: "excerpt from a box of *Woven Wheats Wafers*",
  },
  {
    id: "20",
    plaintext:
      "We have found that two kinds of people exist in the world: those who accept the nonsensical and reinforced views of the masses, bowing attentively and unabashedly to its whims, without concern for the ultimate and inevitable ramifications of their mindless submission; and you. You, the thoughtful, intelligent, questioning, sentient being who is awakened and enlightened to the whirlwind of events and ideas about him while standing firm against the onslaught of skewed political ideologies and jaded personal agendas that pound against our doors of sensibility day in and day out, testing the integrity of the deadbolt we have named our freedom to think independently.",
    author: "the IHateCilantro.com staff",
    origin: "excerpt from the 'About' page of *IHateCilantro.com*",
  },
  {
    id: "21",
    plaintext:
      'Your vehicle is equipped with "all season tires" which are designed to provide an adequate measure of traction, handling, and braking performance in year-round driving. In winter, it may be possible to enhance performance through use of tires designed specifically for winter driving. If you choose to install winter tires on your vehicle, be sure to use the same tire size, construction, brand, and load range as the original tires.',
    author: "Fuji Heavy Industries, LTD.",
    origin: "excerpt from the *Subaru Impreza 1997 Owner's Manual*",
  },
  {
    id: "22",
    plaintext:
      "I made a mechanical dragon \nOf bottle tops, hinges, and string, \nOf thrown away clocks and unmendable socks, \nOf hangers and worn innersprings. \nI built it of cardboard and plastic, \nOf doorknobs and cables and corks, \nOf spools and balloons and unusable spoons, \nAnd rusty old shovels and forks. It's quite an unusual dragon \nIt rolls on irregular wheels, \nIt clatters and creaks and it rattles and squeaks, \nAnd when it tips over, it squeals. \nI've tried to control its maneuvers, \nIt fails to obey my commands, \nIt bumps into walls till it totters and falls \nI made it myself with my hands!",
    author: "Jack Prelutsky",
    origin: "poem from *The Dragons are Singing Tonight",
  },
  {
    id: "23",
    plaintext:
      "He never looked better, nor had he been loved more, nor had the breeding of his animals been wilder. There was a slaughtering of so many cows, pigs, and chickens for the endless parties that the ground in the courtyard turned black and muddy with so much blood. It was an eternal execution ground of bones and innards, a mud pit of leftovers, and they had to keep exploding dynamite bombs all the time so that the buzzards would not pluck out the guests' eyes",
    author: "Gabriel García Márquez",
    origin: "excerpt from *One Hundred Years of Solitude*",
  },
  {
    id: "24",
    plaintext:
      "Those who came before us made certain that this country rode the first waves of the industrial revolutions, the first waves of modern invention, and the first wave of nuclear power, and this generation does not intend to founder in the backwash of the coming age of space. We mean to be a part of it--we mean to lead it. For the eyes of the world now look into space, to the moon and to the planets beyond, and we have vowed that we shall not see it governed by a hostile flag of conquest, but by a banner of freedom and peace. We have vowed that we shall not see space filled with weapons of mass destruction, but with instruments of knowledge and understanding.",
    author: "John F. Kennedy",
    origin:
      "excerpt from *Address at Rice University on the Nation's Space Effort*",
  },
  {
    id: "25",
    plaintext:
      "Here's the thing. You said a \"jackdaw is a crow.\"\n Is it in the same family? Yes. No one's arguing that.\nAs someone who is a scientist who studies crows, I am telling you, specifically, in science, no one calls jackdaws crows. If you want to be \"specific\" like you said, then you shouldn't either. They're not the same thing.\nIf you're saying \"crow family\" you're referring to the taxonomic grouping of Corvidae, which includes things from nutcrackers to blue jays to ravens.\nSo your reasoning for calling a jackdaw a crow is because random people \"call the black ones crows?\" Let's get grackles and blackbirds in there, then, too. \n Also, calling someone a human or an ape? It's not one or the other, that's not how taxonomy works. They're both. A jackdaw is a jackdaw and a member of the crow family. But that's not what you said. You said a jackdaw is a crow, which is not true unless you're okay with calling all members of the crow family crows, which means you'd call blue jays, ravens, and other birds crows, too. Which you said you don't. It's okay to just admit you're wrong, you know?",
    author: "/u/Unidan",
    origin: "comment originally posted on *reddit.com</br>",
  },
  {
    id: "26",
    plaintext:
      "We are challenging the FBI’s demands with the deepest respect for American democracy and a love of our country. We believe it would be in the best interest of everyone to step back and consider the implications. While we believe the FBI’s intentions are good, it would be wrong for the government to force us to build a backdoor into our products. And ultimately, we fear that this demand would undermine the very freedoms and liberty our government is meant to protect.",
    author: "Tim Cook",
    origin: "excerpt from Apple's open letter *A Message to Our Customers*",
  },
  {
    id: "27",
    plaintext:
      "This is our world now... the world of the electron and the switch, the beauty of the baud. We make use of the service already existing without paying for what could be dirt-cheap if it wasn't run by profiteering gluttons, and you call us criminals. We explore... and you call us criminals. We seek after knowledge, and you call us criminals. We exist without skin color, without nationality, without religous bias... and you call us criminals. You build atomic bombs, you wage wars, you murder, cheat, and lie to us and try to make us believe it's for our own good, yet we're the criminals.",
    author: "Loyd Blankenship",
    origin: "excerpt from *The Conscience of a Hacker*",
  },
  {
    id: "28",
    plaintext:
      "You keep it going man\n You keep those books rolling\n You pick up all those books that you're gonna read and not remember\n And you roll, man\n You get that associate's degree, okay?\n Then you get your bachelor's\n Then you get your masters\n Then you get your masters' masters\n Then you get your doctorate\n You go man!\n And then when everyone says quit\n You show them those degrees, man\n When everyone says \"Hey, you're not working, you're not making any money\"\n You say \"You look at my degrees, and you look at my life\n Yeah, I'm fifty-two! So what?\n Hate all you want, but I'm smart, I'm so smart\n And I'm in school\n All these guys out here making money all these ways\n And I'm spending mine to be smart!\n You know why?\n Cause when I die buddy\n You know what's gonna keep me warm?\n That's right, those degrees.\"",
    author: "Kanye West",
    origin: "exerpt from *School Spirit (Skit 2)* on Graduation",
    notes: "plz don't sue me kanye",
  },
  {
    id: "29",
    plaintext:
      "If I may add a personal note, may I say that I know full-well that all mankind have been subjected, without any opposition, for so long to the anti-God theoretical astronomy which kills in early youth all respect for the Creator's statements regarding the construction of the earth and the heavens, that only one here and there will pay any attention whatsoever to any ancient and fighting contrary thought. But I have seen just how ready and keenly interested the youth of today can become when they realise that equally scientific arguments can be brought to bear upon that which has been withheld from them and which they have been indoctrinated to believe is a laughable crank subject. Therefore over the last few years I have made every effort to reach the youthful minds",
    author: "Samuel Shenton",
    origin:
      "excerpt from a personal correspondence between *Samuel Shenton and Ellis Hillman*",
  },
];

export default plaintexts;
