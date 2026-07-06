import Link from "next/link";
import { PageTitle } from "@/components/atoms/PageTitle";
import { SocialLinks } from "@/components/molecules/SocialLinks";

export const dynamic = "force-static";

export default function HomePage() {
    return (
        <div className="flex min-h-0 w-full flex-1 flex-col justify-start">
            <PageTitle title="Hi there, I’m akilasatolu." />
            <SocialLinks />
            <p>Since 2020, I have been working as a software engineer in Japan, developing web services.</p>
            <p>Ever since I was a child, I have loved creating things using LEGO blocks and cardboard boxes.</p>
            <p>Although I studied economics at university, taking a web development course made me rediscover the joy of building things, which inspired me to become an engineer.</p>
            <p>Currently, I mainly work on frontend development, but I also enjoy learning and working across backend development and infrastructure operations without limiting myself to a single area.</p>
            <p>I find great satisfaction in experimenting to achieve a goal and especially in bringing ideas to life through coding.</p>
            <p>The most important thing to me at work is “never giving up.”</p>
            <p>When solving problems, sometimes a small change in perspective can lead to a breakthrough.</p>
            <p>If you give up halfway, you may never discover the solution that was waiting ahead, nor gain the experience you could have learned through the process.</p>
            <p>That is why I always try to face challenges until the very end, continuing to experiment and think through problems without giving up easily.</p>
            <p>My coworkers sometimes describe me as a responsible person.</p>
            <p>I believe that comes from my attitude of staying committed and seeing tasks through, even in difficult situations.</p>
            <p>As AI continues to evolve, I believe software development will require even greater speed and adaptability than ever before.</p>
            <p>In this environment, I aim to become an engineer who can solve problems quickly by contributing across the entire stack, including frontend, backend, and infrastructure.</p>
            <p>I also hope to become someone who can flexibly fill the role a team needs by gaining experience across a wide range of areas.</p>
            <p>More than anything, I genuinely enjoy being involved in many different parts of development.</p>
            <p>Outside of work, I go to the gym to stay healthy.</p>
            <p>My dream is to be like Jason Statham.</p>
            <p>I also enjoy taking photos of beautiful scenery and listening to music.</p>
            <p>Recently, I’ve been listening to <a href="https://www.oneokrock.com/en/" target="_blank" rel="noopener noreferrer" className="font-bold">ONE OK ROCK</a> a lot.</p>
            <p>I love learning new things and experiencing different cultures, and my time living in Australia remains one of the most memorable experiences of my life.</p>
            <p>I share what I learn through my <Link href="/blog" className="font-bold">Blog</Link>, so feel free to check it out if you’re interested.</p>
            <p>For more about my experience and skills, please visit the <Link href="/experience" className="font-bold">Experience</Link>.</p>
            <p>Lastly, I’d like to end with one of my favorite quotes.</p>
            <p>Don’t worry, be happy.</p>
            <p>A life that never gives up, and a heart that never loses.</p>
            <p>I hope our paths cross in a meaningful way.</p>
        </div>
    );
}
