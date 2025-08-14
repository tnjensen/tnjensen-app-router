import { Post } from '@/lib/types';
import { Suspense } from 'react';
import Loading from './loading';

export default async function Projects(){

    const response = await fetch('https://noroff.tnjensen.com/wp-json/wp/v2/posts?categories=6,9&_embed&filter[orderby]=date&order=asc')
    const data = await response.json()
    
    return(
        <div className="grid grid-cols-12 mx-auto px-10 pb-6">
           <h1 className="py-4 text-center col-span-12">Blog</h1>
           <Suspense fallback={<Loading />}> 
            {data?.map((item:Post) => (
                <div className="flex flex-col bg-background rounded max-w-xs px-4 py-3 m-2 col-span-12 mx-auto md:col-span-6 lg:col-span-4" key={item.id}>
                <h2 dangerouslySetInnerHTML={{__html: item.title.rendered}} className="text-xl mb-2"></h2>
                {item._embedded['wp:featuredmedia'] && <img src={item._embedded['wp:featuredmedia'][0].source_url} alt={item._embedded['wp:featuredmedia'][0].alt_text} className="mb-3" /> }
                <span dangerouslySetInnerHTML={{__html: item.content.rendered}}></span>
                <hr className="mt-2"/>
                </div>
            ))}
            </Suspense>
        </div>
    )
}