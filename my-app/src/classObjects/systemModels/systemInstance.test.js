import { CartModel } from "./cartModel.js";
import fs from 'fs';

const Cartinstance = new CartModel()


test('System Objects: Test 1 - Cart addition', () => {

  Cartinstance.addClass("ACCT 2001", [{
      crn: '',
      subject: 'ACCT',
      catalogNbr: '2001',
      classSection: '002',
      academicCareer: 'Undergrad',
      units: '',
      campus: 'STORR',
      title: 'Prin. of Financial Accounting',
      requiredSections: '',
      instructionMode: 'In Person',
      professor: 'Leanne Adams (PI)',
      time: '11:00AM - 12:15PM / TuTh',
      availableSeats: 8
    },
    {
      crn: '1188',
      subject: 'ACCT',
      catalogNbr: '2001',
      classSection: '002D',
      academicCareer: 'Undergrad',
      units: '3.00',
      campus: 'STORR',
      title: 'Prin. of Financial Accounting',
      requiredSections: 'You will be auto-enrolled in section(s) 002',
      instructionMode: 'In Person',
      professor: 'Leanne Adams (PI)',
      time: '9:05AM - 9:55AM / Fr',
      availableSeats: 7
    }])


  expect(Cartinstance.currentCartClasses().length).toBe(1);


  Cartinstance.addClass('ACCT 6211', [{
      crn: '1272',
      subject: 'ACCT',
      catalogNbr: '6211',
      classSection: '001',
      academicCareer: 'Graduate',
      units: '1.00',
      campus: 'STORR',
      title: 'Sem in Spec Research Topics',
      requiredSections: '',
      instructionMode: 'In Person',
      professor: 'Todd Kravet (PI)',
      time: '2:15PM - 3:30PM / We',
      availableSeats: 5
    }
  ])


  expect(Cartinstance.currentCartClasses().length).toBe(2);


  expect(Cartinstance.addClass('ACCT 6211', [])).toBe(500);

});


test('System Objects: Test 2 - Cart State', () => {
  expect(Cartinstance.inCartCheck("ACCT 6211")).toBe(true);
  expect(Cartinstance.inCartCheck("ACCT 2001")).toBe(true);
  expect(Cartinstance.currentCartClasses()).toEqual(["ACCT 2001", "ACCT 6211"]);
});


test('System Objects: Test 3 - Cart Remove', () => {
  expect(Cartinstance.removeClass("ACCT 6211")).toBe(200);
  expect(Cartinstance.removeClass("ACCT 2001")).toBe(200);
  expect(Cartinstance.removeClass("ACCT 2001")).toBe(500);
  expect(Cartinstance.currentCartClasses().length).toBe(0);
});


test('System Objects: Test 4 - Pre-scheduling(Class with 0 Dependents) -- No Restrictions', () => {

  const Cartinstance = new CartModel()

  Cartinstance.addClass("ECE 6437", [
    {
      crn: '8215',
      subject: 'ECE',
      catalogNbr: '6437',
      classSection: '001',
      academicCareer: 'Graduate',
      units: '3.00',
      campus: 'STORR',
      title: 'Computat Meth for Optimization',
      requiredSections: '',
      instructionMode: 'In Person',
      professor: 'James Wilson (PI)',
      time: '6:00PM - 9:00PM / Tu',
      availableSeats: 7
    }
  ])

  const output = Cartinstance.handlePreScheduleProcessing()
  expect(output["status"]).toBe(200);

});


test('System Objects: Test 5 - Pre-scheduling(Class with 1 Dependents) -- No Restrictions', () => {

  const Cartinstance = new CartModel()

  Cartinstance.addClass("ACCT 2001", [{
      crn: '',
      subject: 'ACCT',
      catalogNbr: '2001',
      classSection: '002',
      academicCareer: 'Undergrad',
      units: '',
      campus: 'STORR',
      title: 'Prin. of Financial Accounting',
      requiredSections: '',
      instructionMode: 'In Person',
      professor: 'Leanne Adams (PI)',
      time: '11:00AM - 12:15PM / TuTh',
      availableSeats: 8
    },
    {
      crn: '1188',
      subject: 'ACCT',
      catalogNbr: '2001',
      classSection: '002D',
      academicCareer: 'Undergrad',
      units: '3.00',
      campus: 'STORR',
      title: 'Prin. of Financial Accounting',
      requiredSections: 'You will be auto-enrolled in section(s) 002',
      instructionMode: 'In Person',
      professor: 'Leanne Adams (PI)',
      time: '9:05AM - 9:55AM / Fr',
      availableSeats: 8
  }])

  const output = Cartinstance.handlePreScheduleProcessing()

  expect(output["status"]).toBe(200);

});


test('System Objects: Test 6 - Pre-scheduling(Class with 1+ Dependents) -- No Restrictions', () => {

  const Cartinstance = new CartModel()

  Cartinstance.addClass("ECE 2001", [
    {
      "crn": "",
      "subject": "ECE",
      "catalogNbr": "2001",
      "classSection": "001",
      "academicCareer": "Undergrad",
      "units": "",
      "campus": "STORR",
      "title": "Electrical Circuits",
      "requiredSections": "",
      "instructionMode": "Hybrid",
      "professor": "Ali Gokirmak (PI)",
      "time": "10:10AM - 11:00AM / MoWeFr",
      "availableSeats": 6
    },
    {
      "crn": "",
      "subject": "ECE",
      "catalogNbr": "2001",
      "classSection": "001D",
      "academicCareer": "Undergrad",
      "units": "4.00",
      "campus": "STORR",
      "title": "Electrical Circuits",
      "requiredSections": "",
      "instructionMode": "In Person",
      "professor": "Ali Gokirmak (SI)",
      "time": "3:45PM - 5:45PM / We",
      "availableSeats": 7
    },
    {
      "crn": "8176",
      "subject": "ECE",
      "catalogNbr": "2001",
      "classSection": "001L",
      "academicCareer": "Undergrad",
      "units": "4.00",
      "campus": "STORR",
      "title": "Electrical Circuits",
      "requiredSections": "You will be auto-enrolled in section(s) 001, 001D",
      "instructionMode": "In Person",
      "professor": "Ali Gokirmak (SI)",
      "time": "9:00AM - 10:45AM / Tu",
      "availableSeats": 8
    },
    {
      "crn": "",
      "subject": "ECE",
      "catalogNbr": "2001",
      "classSection": "002D",
      "academicCareer": "Undergrad",
      "units": "4.00",
      "campus": "STORR",
      "title": "Electrical Circuits",
      "requiredSections": "",
      "instructionMode": "In Person",
      "professor": "Ali Gokirmak (PI)",
      "time": "3:45PM - 5:45PM / We",
      "availableSeats": 8
    },
    {
      "crn": "8178",
      "subject": "ECE",
      "catalogNbr": "2001",
      "classSection": "002L",
      "academicCareer": "Undergrad",
      "units": "4.00",
      "campus": "STORR",
      "title": "Electrical Circuits",
      "requiredSections": "You will be auto-enrolled in section(s) 001, 002D",
      "instructionMode": "In Person",
      "professor": "Ali Gokirmak (SI)",
      "time": "11:00AM - 12:45PM / Tu",
      "availableSeats": 8
    }])

  const output = Cartinstance.handlePreScheduleProcessing()
  expect(output["status"]).toBe(200);

});


test('System Objects: Test 7 -- Pre-scheduling -- with Restrictions', () => {


  const Cartinstance = new CartModel()


  Cartinstance.addClass("ECE 2001", [
    {
      "crn": "",
      "subject": "ECE",
      "catalogNbr": "2001",
      "classSection": "001",
      "academicCareer": "Undergrad",
      "units": "",
      "campus": "STORR",
      "title": "Electrical Circuits",
      "requiredSections": "",
      "instructionMode": "Hybrid",
      "professor": "Ali Gokirmak (PI)",
      "time": "10:10AM - 11:00AM / MoWeFr",
      "availableSeats": 6
    },
    {
      "crn": "",
      "subject": "ECE",
      "catalogNbr": "2001",
      "classSection": "005",
      "academicCareer": "Undergrad",
      "units": "",
      "campus": "STORR",
      "title": "Electrical Circuits",
      "requiredSections": "",
      "instructionMode": "Hybrid",
      "professor": "Eric Asante (PI)",
      "time": "10:10AM - 11:00AM / MoWeFr",
      "availableSeats": 6
    },
    {
      "crn": "",
      "subject": "ECE",
      "catalogNbr": "2001",
      "classSection": "001D",
      "academicCareer": "Undergrad",
      "units": "4.00",
      "campus": "STORR",
      "title": "Electrical Circuits",
      "requiredSections": "",
      "instructionMode": "In Person",
      "professor": "Ali Gokirmak (SI)",
      "time": "3:45PM - 5:45PM / We",
      "availableSeats": 7
    },
    {
      "crn": "8176",
      "subject": "ECE",
      "catalogNbr": "2001",
      "classSection": "001L",
      "academicCareer": "Undergrad",
      "units": "4.00",
      "campus": "STORR",
      "title": "Electrical Circuits",
      "requiredSections": "You will be auto-enrolled in section(s) 001, 001D",
      "instructionMode": "In Person",
      "professor": "Ali Gokirmak (SI)",
      "time": "9:00AM - 10:45AM / Tu",
      "availableSeats": 8
    },
    {
      "crn": "",
      "subject": "ECE",
      "catalogNbr": "2001",
      "classSection": "002D",
      "academicCareer": "Undergrad",
      "units": "4.00",
      "campus": "STORR",
      "title": "Electrical Circuits",
      "requiredSections": "",
      "instructionMode": "In Person",
      "professor": "Eric Asante (PI)",
      "time": "3:45PM - 5:45PM / We",
      "availableSeats": 7
    },
    {
      "crn": "8178",
      "subject": "ECE",
      "catalogNbr": "2001",
      "classSection": "002L",
      "academicCareer": "Undergrad",
      "units": "4.00",
      "campus": "STORR",
      "title": "Electrical Circuits",
      "requiredSections": "You will be auto-enrolled in section(s) 005, 002D",
      "instructionMode": "In Person",
      "professor": "Eric Asante (PI)",
      "time": "11:00AM - 12:45PM / Tu",
      "availableSeats": 7
    }])



  Cartinstance.sectionConstraintAdder("ECE 2001", "8178")
  const output = Cartinstance.handlePreScheduleProcessing()

  expect(output["status"]).toBe(200);
  expect(output["value"]["ECE 2001"]["AllClassCRNs"].includes("8178")).toBe(true);
  expect(output["value"]["ECE 2001"]["AllClassCRNs"].length).toBe(1);

  Cartinstance.sectionConstraintRemover("ECE 2001")
  const output2 = Cartinstance.handlePreScheduleProcessing()

  expect(output2["status"]).toBe(200);
  expect(output2["value"]["ECE 2001"]["AllClassCRNs"].length).toBe(2);

  Cartinstance.professorConstraintAdder("ECE 2001", "Eric Asante (PI)")
  const output3 = Cartinstance.handlePreScheduleProcessing()

  expect(output3["status"]).toBe(200);
  expect(output3["value"]["ECE 2001"]["AllClassCRNs"].length).toBe(1);
  expect(output3["value"]["ECE 2001"]["AllClassCRNs"].includes("8178")).toBe(true);

  Cartinstance.sectionConstraintAdder("ECE 2001", "8178")
  const output4 = Cartinstance.handlePreScheduleProcessing()

  expect(output4["status"]).toBe(200);
  expect(output3["value"]["ECE 2001"]["AllClassCRNs"].includes("8178")).toBe(true);
  expect(output3["value"]["ECE 2001"]["AllClassCRNs"].length).toBe(1);

} )


test('System Objects: Test 8 -- Class Inclusion Toggle', () => {

  const Cartinstance = new CartModel()


  Cartinstance.addClass("ACCT 2001", [{
      crn: '',
      subject: 'ACCT',
      catalogNbr: '2001',
      classSection: '002',
      academicCareer: 'Undergrad',
      units: '',
      campus: 'STORR',
      title: 'Prin. of Financial Accounting',
      requiredSections: '',
      instructionMode: 'In Person',
      professor: 'Leanne Adams (PI)',
      time: '11:00AM - 12:15PM / TuTh',
      availableSeats: 8
    },
    {
      crn: '1188',
      subject: 'ACCT',
      catalogNbr: '2001',
      classSection: '002D',
      academicCareer: 'Undergrad',
      units: '3.00',
      campus: 'STORR',
      title: 'Prin. of Financial Accounting',
      requiredSections: 'You will be auto-enrolled in section(s) 002',
      instructionMode: 'In Person',
      professor: 'Leanne Adams (PI)',
      time: '9:05AM - 9:55AM / Fr',
      availableSeats: 8
  }])


  Cartinstance.addClass("ECE 2001", [
    {
      "crn": "",
      "subject": "ECE",
      "catalogNbr": "2001",
      "classSection": "001",
      "academicCareer": "Undergrad",
      "units": "",
      "campus": "STORR",
      "title": "Electrical Circuits",
      "requiredSections": "",
      "instructionMode": "Hybrid",
      "professor": "Ali Gokirmak (PI)",
      "time": "10:10AM - 11:00AM / MoWeFr",
      "availableSeats": 6
    },
    {
    "crn": "",
    "subject": "ECE",
    "catalogNbr": "2001",
    "classSection": "001D",
    "academicCareer": "Undergrad",
    "units": "4.00",
    "campus": "STORR",
    "title": "Electrical Circuits",
    "requiredSections": "",
    "instructionMode": "In Person",
    "professor": "Ali Gokirmak (SI)",
    "time": "3:45PM - 5:45PM / We",
    "availableSeats": 7
    },
    {
    "crn": "8176",
    "subject": "ECE",
    "catalogNbr": "2001",
    "classSection": "001L",
    "academicCareer": "Undergrad",
    "units": "4.00",
    "campus": "STORR",
    "title": "Electrical Circuits",
    "requiredSections": "You will be auto-enrolled in section(s) 001, 001D",
    "instructionMode": "In Person",
    "professor": "Ali Gokirmak (SI)",
    "time": "9:00AM - 10:45AM / Tu",
    "availableSeats": 8
    }])


  Cartinstance.addClass('ACCT 6211', [{
      crn: '1272',
      subject: 'ACCT',
      catalogNbr: '6211',
      classSection: '001',
      academicCareer: 'Graduate',
      units: '1.00',
      campus: 'STORR',
      title: 'Sem in Spec Research Topics',
      requiredSections: '',
      instructionMode: 'In Person',
      professor: 'Todd Kravet (PI)',
      time: '2:15PM - 3:30PM / We',
      availableSeats: 7
    }
  ])

  const output = Cartinstance.handlePreScheduleProcessing()
  expect(Object.keys(output["value"]).length).toBe(3);

  Cartinstance.classInclusionChange("ACCT 2001")

  const output2 = Cartinstance.handlePreScheduleProcessing()
  expect(Object.keys(output2["value"]).length).toBe(2);

  Cartinstance.classInclusionChange("ACCT 2001")

  const output3 = Cartinstance.handlePreScheduleProcessing()
  expect(Object.keys(output3["value"]).length).toBe(3);

})


test('System Objects: Test 9 -- Case where a class has no open seats', () => {

  const Cartinstance = new CartModel()


  Cartinstance.addClass("ACCT 2001", [{
      crn: '',
      subject: 'ACCT',
      catalogNbr: '2001',
      classSection: '002',
      academicCareer: 'Undergrad',
      units: '',
      campus: 'STORR',
      title: 'Prin. of Financial Accounting',
      requiredSections: '',
      instructionMode: 'In Person',
      professor: 'Leanne Adams (PI)',
      time: '11:00AM - 12:15PM / TuTh',
      availableSeats: 8
    },
    {
      crn: '1188',
      subject: 'ACCT',
      catalogNbr: '2001',
      classSection: '002D',
      academicCareer: 'Undergrad',
      units: '3.00',
      campus: 'STORR',
      title: 'Prin. of Financial Accounting',
      requiredSections: 'You will be auto-enrolled in section(s) 002',
      instructionMode: 'In Person',
      professor: 'Leanne Adams (PI)',
      time: '9:05AM - 9:55AM / Fr',
      availableSeats: 8
  }])


  Cartinstance.addClass('ACCT 6211', [{
      crn: '1272',
      subject: 'ACCT',
      catalogNbr: '6211',
      classSection: '001',
      academicCareer: 'Graduate',
      units: '1.00',
      campus: 'STORR',
      title: 'Sem in Spec Research Topics',
      requiredSections: '',
      instructionMode: 'In Person',
      professor: 'Todd Kravet (PI)',
      time: '2:15PM - 3:30PM / We',
      availableSeats: 0
    }
  ]) 

  const output = Cartinstance.handlePreScheduleProcessing()
  expect(output["status"]).toBe(500);
  expect(output["value"]).toBe("error no open classes for ACCT 6211");
})


test('System Objects: Test 10 - Case where 1 or more dependent section in a primary section has no seats', () => {

  const Cartinstance = new CartModel()

  Cartinstance.addClass("ECE 2001", [
    {
      "crn": "",
      "subject": "ECE",
      "catalogNbr": "2001",
      "classSection": "001",
      "academicCareer": "Undergrad",
      "units": "",
      "campus": "STORR",
      "title": "Electrical Circuits",
      "requiredSections": "",
      "instructionMode": "Hybrid",
      "professor": "Ali Gokirmak (PI)",
      "time": "10:10AM - 11:00AM / MoWeFr",
      "availableSeats": 7
    },
    {
      "crn": "",
      "subject": "ECE",
      "catalogNbr": "2001",
      "classSection": "001D",
      "academicCareer": "Undergrad",
      "units": "4.00",
      "campus": "STORR",
      "title": "Electrical Circuits",
      "requiredSections": "",
      "instructionMode": "In Person",
      "professor": "Ali Gokirmak (SI)",
      "time": "3:45PM - 5:45PM / We",
      "availableSeats": 7
    },
    {
      "crn": "8176",
      "subject": "ECE",
      "catalogNbr": "2001",
      "classSection": "001L",
      "academicCareer": "Undergrad",
      "units": "4.00",
      "campus": "STORR",
      "title": "Electrical Circuits",
      "requiredSections": "You will be auto-enrolled in section(s) 001, 001D",
      "instructionMode": "In Person",
      "professor": "Ali Gokirmak (SI)",
      "time": "9:00AM - 10:45AM / Tu",
      "availableSeats": 7
    },
    {
      "crn": "",
      "subject": "ECE",
      "catalogNbr": "2001",
      "classSection": "002D",
      "academicCareer": "Undergrad",
      "units": "4.00",
      "campus": "STORR",
      "title": "Electrical Circuits",
      "requiredSections": "",
      "instructionMode": "In Person",
      "professor": "Ali Gokirmak (PI)",
      "time": "3:45PM - 5:45PM / We",
      "availableSeats": 0
    },
    {
      "crn": "8178",
      "subject": "ECE",
      "catalogNbr": "2001",
      "classSection": "002L",
      "academicCareer": "Undergrad",
      "units": "4.00",
      "campus": "STORR",
      "title": "Electrical Circuits",
      "requiredSections": "You will be auto-enrolled in section(s) 001, 002D",
      "instructionMode": "In Person",
      "professor": "Ali Gokirmak (SI)",
      "time": "11:00AM - 12:45PM / Tu",
      "availableSeats": 0
    }])

  const output = Cartinstance.handlePreScheduleProcessing()
  expect(output["status"]).toBe(200);
  expect(output["value"]["ECE 2001"]["AllClassCRNs"].length).toBe(1);
});


test('System Objects: Test 11 - Theme/Event Schedule View', () => {


const Cartinstance = new CartModel()


  Cartinstance.addClass("ACCT 2001", [{
      crn: '',
      subject: 'ACCT',
      catalogNbr: '2001',
      classSection: '002',
      academicCareer: 'Undergrad',
      units: '',
      campus: 'STORR',
      title: 'Prin. of Financial Accounting',
      requiredSections: '',
      instructionMode: 'In Person',
      professor: 'Leanne Adams (PI)',
      time: '11:00AM - 12:15PM / TuTh',
      availableSeats: 8
    },
    {
      crn: '1188',
      subject: 'ACCT',
      catalogNbr: '2001',
      classSection: '002D',
      academicCareer: 'Undergrad',
      units: '3.00',
      campus: 'STORR',
      title: 'Prin. of Financial Accounting',
      requiredSections: 'You will be auto-enrolled in section(s) 002',
      instructionMode: 'In Person',
      professor: 'Leanne Adams (PI)',
      time: '9:05AM - 9:55AM / Fr',
      availableSeats: 8
  }])


  Cartinstance.addClass("ECE 2001", [
    {
      "crn": "",
      "subject": "ECE",
      "catalogNbr": "2001",
      "classSection": "001",
      "academicCareer": "Undergrad",
      "units": "",
      "campus": "STORR",
      "title": "Electrical Circuits",
      "requiredSections": "",
      "instructionMode": "Hybrid",
      "professor": "Ali Gokirmak (PI)",
      "time": "10:10AM - 11:00AM / MoWeFr",
      "availableSeats": 6
    },
    {
    "crn": "",
    "subject": "ECE",
    "catalogNbr": "2001",
    "classSection": "001D",
    "academicCareer": "Undergrad",
    "units": "4.00",
    "campus": "STORR",
    "title": "Electrical Circuits",
    "requiredSections": "",
    "instructionMode": "In Person",
    "professor": "Ali Gokirmak (SI)",
    "time": "3:45PM - 5:45PM / We",
    "availableSeats": 7
    },
    {
    "crn": "8176",
    "subject": "ECE",
    "catalogNbr": "2001",
    "classSection": "001L",
    "academicCareer": "Undergrad",
    "units": "4.00",
    "campus": "STORR",
    "title": "Electrical Circuits",
    "requiredSections": "You will be auto-enrolled in section(s) 001, 001D",
    "instructionMode": "In Person",
    "professor": "Ali Gokirmak (SI)",
    "time": "9:00AM - 10:45AM / Tu",
    "availableSeats": 8
    }])


  Cartinstance.addClass('ACCT 6211', [{
      crn: '1272',
      subject: 'ACCT',
      catalogNbr: '6211',
      classSection: '001',
      academicCareer: 'Graduate',
      units: '1.00',
      campus: 'STORR',
      title: 'Sem in Spec Research Topics',
      requiredSections: '',
      instructionMode: 'In Person',
      professor: 'Todd Kravet (PI)',
      time: '2:15PM - 3:30PM / We',
      availableSeats: 7
    }
  ])

  const output = Cartinstance.handlePreScheduleProcessing()
  fs.writeFileSync('COLOEE.txt', JSON.stringify(Cartinstance.miniScheduleViewProccessing({ "ACCT 6211": "1272", "ECE 2001": "8176", "ACCT 2001": "1188" })), 'utf8');

  console.log()
  expect(Object.keys(output["value"]).length).toBe(3);

  Cartinstance.classInclusionChange("ACCT 2001")

  const output2 = Cartinstance.handlePreScheduleProcessing()
  expect(Object.keys(output2["value"]).length).toBe(2);

  Cartinstance.classInclusionChange("ACCT 2001")

  const output3 = Cartinstance.handlePreScheduleProcessing()
  expect(Object.keys(output3["value"]).length).toBe(3);



});
