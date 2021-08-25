const fs = require("fs");

const file = fs.readFileSync("./db.json");

function removeEach(n, patient) {
	let count = 0;
	const result = patient.filter(() => {
		return count++ % n;
	});
}

function getPatient(json, deep) {
	const obj = JSON.parse(json);
	const arr = Object.values(obj);
	return deep ? arr[deep - 1] : arr;
}

function removePercents(c, patient) {
	let count = 0;
	const result = patient
		.filter(() => {
			count += c;
			const now = count;
			const res = now >= 100;
			res && (count -= 100);
			return !res;
		})
		.sort((a, b) => a.id - b.id)
		.map((v, i) => {
			const d = v.data.general;
			const r = {
				id: i,
				name: d.name,
				description: d.description.replace(/<[^>]*>?/gm, ''),
				address: d.address.fullAddress,
				image: d.image,
				contacts: d.contacts,
				locale: d.locale
			};
			return r;
		});

	return result;
}

function replaceData(file, key, data) {
	const obj = JSON.parse(file);
	obj[key] = data;
	return JSON.stringify(obj);
}

function write(json) {
	fs.writeFile("db-cut.json", json, function (err) {
		if (err) {
			return console.log(err);
		}

		console.log("The file was saved!");
	});
}

write(replaceData(file, "libs", removePercents(85, getPatient(file, 1))));
