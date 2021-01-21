import Config from './config';
import data from './data.json';

// export const fetchAllPrograms = () => fetch(Config.apiUrl + Config.api_routes.allPrograms)

export const fetchAllPrograms = () => data;

export const fetchPopularPrograms = () => { }

export const fetchRecentPrograms = () => { }

export const fetchSubscribedPrograms = () => { }

// export const fetchActivePrograms = () => fetch(Config.apiUrl + Config.api_routes.allPrograms)

// export const fetchSingleProgram = (programTitle) => fetch(Config.apiUrl + Config.api_routes.singleProgram + programTitle)

export const fetchActivePrograms = () => data;

export const fetchSingleProgram = (programTitle) =>  {

    const program = data.programs.find(program => program.title === programTitle);
    const podcasts = data.podcasts.filter(podcast => podcast.program_title === programTitle);
    const performs = data.performs.filter(perform => perform.program_title === programTitle);
    const authors = data.authors.filter(author => {
        return performs.some(perform => {
            if(perform.program_title===programTitle && perform.firstname === author.firstname && perform.lastname === author.lastname){
                author.role=perform.role
                return true;
            }
            return false;
        })
    });

    return {
        "program": program,
        "podcasts": podcasts,
        "authors": authors
    }
}

export const searchPrograms = () => { }

export const subscribe = () => { }

export const fetchLiveText = () => fetch(Config.live_track.titleUrl)

export const fetchLiveImage = () => fetch(Config.live_track.artworkUrl)