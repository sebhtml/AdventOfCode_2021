// ts-node count-increases.ts

const events = require('events');
const fs = require('fs');
const rd = require('readline');

async function readElements(fileName: string)
{
	console.log("Reading file " + fileName);

	let elements: Array<number> = [];

	let reader = rd.createInterface(fs.createReadStream(fileName));
	reader.on("line", (line: string) =>
	{
		//console.log("Got line " + line);
		let element = parseInt(line);
		elements.push(element);
	});

	reader.on("close", ()=>
	{
		//console.log("Number of elements read from file: " + elements.length);
		elements.forEach(element =>
		{
			//console.log(element);
		});
	});

	await events.once(reader, 'close');
	//console.log("on readElements exit, elements: " + elements.length);
	await elements;
	return elements;
}

function readElementsFromDisk()
{
	const fileName = "input.txt";
	//const elementsPromise = readElements(fileName);
	//const elements = await elementsPromise;
	//console.log("Elements: " + elements.length);

	const elements: Array<number> = fs.readFileSync(fileName)
		.toString().replace(/\r\n/g,'\n')
		.split('\n').map((x: string) => parseInt(x))
		.filter((x: number) => !isNaN(x));

	console.log("Got " + elements.length + " elements");
	return elements;
}

function countIncreases()
{
	const elements = readElementsFromDisk();

	let numberOfIncreases = 0;

	for (let i: number = 0; i != elements.length; ++i)
	{
		if (i != 0)
		{
			const element: number = elements[i];
			console.log(element);
			const previousElement = elements[i - 1];
			const increased = element > previousElement;
			if (increased)
			{
				++numberOfIncreases;
			}
		}
	}

	console.log("Number of increases: " + numberOfIncreases);
}

countIncreases();


function countWindowIncreases()
{
	const elements = readElementsFromDisk();

	let numberOfIncreases = 0;

	for (let i: number = 0; i != elements.length; ++i)
	{
		if ((i+1) >= 4)
		{
			const elementIMinus0: number = elements[i - 0];
			const elementIMinus1: number = elements[i - 1];
			const elementIMinus2: number = elements[i - 2];
			const elementIMinus3: number = elements[i - 3];
			const beforeSum = elementIMinus3 + elementIMinus2 + elementIMinus1;
			const afterSum = elementIMinus2 + elementIMinus1 + elementIMinus0;
			const increased = afterSum > beforeSum;
			if (increased)
			{
				++numberOfIncreases;
			}
		}
	}

	console.log("Number of window increases: " + numberOfIncreases);
}

countWindowIncreases();

