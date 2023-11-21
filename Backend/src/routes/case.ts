import { Request, Response } from "express";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';

const router = require("express").Router();

module.exports = router;

type Customer = {
    customerName : string,
    startDate: string,
    isFinished: boolean
}

router.post('/case', (req: Request, res: Response) => {
    try {

        let cases: Array<object> = [];

        let {customerName, startDate, isFinished} : Customer = req.body;

        let fxField: string = `${customerName}-${startDate.split('-')[0].substring(2,4)}-${uuidv4().split('-')[1]}`;

        const filePath: string = __dirname.concat("/caseFile.txt");
    
        let caseFile: string = fs.readFileSync(filePath, "utf-8");

        if(caseFile)
        {
            cases = JSON.parse(caseFile); 
        }
        else
        {
            cases = [];
        }

        let obj = {
            customerName: customerName,
            startDate: startDate,
            isFinished: isFinished,
            fxField: fxField
        }

        cases.push(obj);
        caseFile = JSON.stringify(cases);

        fs.writeFileSync(filePath, caseFile, "utf-8");

        res.status(200).json({ message: "Case added successfully" });

    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/allCases', async (req: Request, res: Response) => {
    try {
        const filePath: string = __dirname.concat("/caseFile.txt");

        let caseFile: string;
        try {
            caseFile = fs.readFileSync(filePath, "utf-8");
        } catch (err: any) {

            return res.status(400).json({ cases: [] });
        }

        let cases = JSON.parse(caseFile);

        res.status(200).json({ cases });

    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});
