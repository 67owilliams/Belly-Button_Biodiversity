const url = "https://api.spacexdata.com/v2/launchpads";

d3.json(url).then(receivedData => console.log(receivedData));
d3.json(url).then(spaceXResults => console.log(spaceXResults[0].full_name));

d3.json("samples.json").then(function(data){
    console.log(data);
});

//Extract weekly belly button washing frequency of each person
d3.json("samples.json").then(function(data){
    wfreq = data.metadata.map(person => person.wfreq);
//    console.log(wfreq);
});

//Extract weekly belly button washing frequency of each person
//in descending order
d3.json("samples.json").then(function(data){
    wfreq = data.metadata.map(person =>
person.wfreq).sort((a,b) => b - a);
//    console.log(wfreq);
});

//Filter null values
d3.json("samples.json").then(function(data){
    wfreq = data.metadata.map(person =>
person.wfreq).sort((a,b) => b - a);
    filteredWfreq = wfreq.filter(element => element !=
null);
    console.log(filteredWfreq);
});

//Object.entries() sample
researcher1 = {
    name: 'Roza',
    age: 34,
    hobby: 'Hiking'
};

console.log(Object.entries(researcher1));
researcher1.forEach(([first, second]) => console.log(first
    + ": " + second));

d3.json("samples.json").then(function(data){
    firstPerson = data.metadata[0];
    Object.entries(firstPerson).forEach(([key, value]) =>
        {console.log(key + ': ' + value);});
});