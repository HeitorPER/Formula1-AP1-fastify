import fastify from 'fastify';
import cors from '@fastify/cors';

const server = fastify({ logger: true });

server.register(cors, {
    origin: "*",
    
});

const teams = [
    [
        { id: 1, name: "Ferrari", Base: "Maranello, Italy" },
        { id: 2, name: "Mercedes", Base: "Brackley, United Kingdom" },
        { id: 3, name: "Red Bull Racing", Base: "Milton Keynes, United Kingdom" },
        { id: 4, name: "McLaren", Base: "Woking, United Kingdom" },
        { id: 5, name: "Aston Martin", Base: "Silverstone, United Kingdom" },
        { id: 6, name: "Alpine", Base: "Enstone, United Kingdom" },
        { id: 7, name: "Williams", Base: "Grove, United Kingdom" },
        { id: 8, name: "Haas", Base: "Kannapolis, United States" },
        { id: 9, name: "Alfa Romeo", Base: "Hinwil, Switzerland" },
        { id: 10, name: "AlphaTauri", Base: "Faenza, Italy" }
    ]
    
]

const drivers = [
    [
        { id: 1, name: "Max Verstappen", team: "Red Bull Racing" },
        { id: 2, name: "Sergio Perez", team: "Red Bull Racing" },
        { id: 3, name: "Lewis Hamilton", team: "Mercedes" },
        { id: 4, name: "George Russell", team: "Mercedes" },
        { id: 5, name: "Charles Leclerc", team: "Ferrari" },
        { id: 6, name: "Carlos Sainz", team: "Ferrari" },
        { id: 7, name: "Lando Norris", team: "McLaren" },
        { id: 8, name: "Oscar Piastri", team: "McLaren" },
        { id: 9, name: "Fernando Alonso", team: "Aston Martin" },
        { id: 10, name: "Lance Stroll", team: "Aston Martin" },
        { id: 11, name: "Pierre Gasly", team: "Alpine" },
        { id: 12, name: "Esteban Ocon", team: "Alpine" },
        { id: 13, name: "Alexander Albon", team: "Williams" },
        { id: 14, name: "Logan Sargeant", team: "Williams" },
        { id: 15, name: "Valtteri Bottas", team: "Alfa Romeo" },
        { id: 16, name: "Zhou Guanyu", team: "Alfa Romeo" },
        { id: 17, name: "Kevin Magnussen", team: "Haas" },
        { id: 18, name: "Nico Hülkenberg", team: "Haas" },
        { id: 19, name: "Yuki Tsunoda", team: "AlphaTauri" },
        { id: 20, name: "Daniel Ricciardo", team: "AlphaTauri" }
    ]
    
]
server.get("/teams", async (request, response) => {
    response.type("aplication/json").code(200);
    return {teams};
});

server.get("/drivers", async (request, response) => {
    response.type("aplication/json").code(200);
    return {drivers};
});

server.listen({port: 3333}, ()=>{
        console.log("Server is running on port 3333");
});

interface DriversParams{
    id: string;
}

interface TeamsParams{
    id: string;
}

server.get<{ Params: DriversParams }>
    ("/drivers/:id", async (request, response) =>
    {
    const id = parseInt(request.params.id);
    const driver = drivers[0].find((d) => d.id === id);

    if (!driver){
        response.type("aplication/json").code(404);
        return {message: "Driver not found"};
    }else{
        response.type("aplication/json").code(200);
        return {driver};
    }
});

server.get<{ Params: TeamsParams }>
    ("/teams/:id", async (request, response) =>
    {
    const id = parseInt(request.params.id);
    const team = teams[0].find((d) => d.id === id);

    if (!team){
        response.type("aplication/json").code(404);
        return {message: "Team not found"};
    }else{
        response.type("aplication/json").code(200);
        return {team};
    }
});
