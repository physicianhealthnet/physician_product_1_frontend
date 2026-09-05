const resultText = `
Patient Problem: Frequent headaches
Duration: 3 days
History: No prior issues
Treatment Plan: Rest
`;

let parsedData = {};
try {
    const jsonMatch = resultText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
        parsedData = JSON.parse(jsonMatch[0]);
    } else {
        const lines = resultText.split('\n');
        lines.forEach(line => {
            const match = line.match(/^([^:-]+)[:\-]\s*(.+)$/);
            if (match) {
                const key = match[1].trim();
                const val = match[2].trim();
                parsedData[key] = val;
            }
        });
    }
} catch (e) {
    console.log(e);
}

const getVal = (keys) => {
    const foundKey = Object.keys(parsedData).find(k => keys.some(key => k.toLowerCase().includes(key)));
    return foundKey ? parsedData[foundKey] : "";
};

console.log({
    chiefComplaint: getVal(['chief complaint', 'problem', 'issue']) || parsedData.chiefComplaint || parsedData.patientProblem || "",
    duration: getVal(['duration', 'time']) || parsedData.duration || "",
    history: getVal(['history']) || parsedData.history || "",
    treatmentPlan: getVal(['treatment', 'plan']) || parsedData.treatmentPlan || "",
});
