export default syncAndSeed = async () => {
  await conn.sync({ force: true });
  await School.create({
    id: "44e28add-af37-42f5-b152-a0044cde8ca3",
    name: "Fullstack Academy"});
  await School.create({
    id: "e5a9c82d-89ce-4dae-9e75-e9c9d908c0d1",
    name: "SDSU"});
  await School.create({
    id: "c141e7d9-f429-4992-a485-5f0cdd36a042",
    name: "HSU"});
  await School.create({
    id: "97564609-5f68-4dfb-aaad-b434103e7b5a",
    name: "Cuesta"});
  await School.create({
    id: "5b832a5a-2e23-4ad6-b84d-c324aed131de",
    name: "MiraCosta"});
  await Student.create({
    firstName: 'Nick',
    lastName: 'Regoli',
    email: 'superBotanist@theBest.com',
    gpa: 5.0,
    schoolId: "44e28add-af37-42f5-b152-a0044cde8ca3"})
  await Student.create({
    firstName: 'JoeBob',
    lastName: 'BobJoe',
    email: 'dontMess@withTheBest.com',
    gpa: 3.9,
    schoolId: "97564609-5f68-4dfb-aaad-b434103e7b5a"})
  await Student.create({
    firstName: 'Susie',
    lastName: 'Regman',
    email: 'sweet@vanillaBean.com',
    gpa: 5.99999})
  await Student.create({
    firstName: 'Cool',
    lastName: 'Man',
    email: 'sweet@email.net',
    gpa: 5.0,
    schoolId: "c141e7d9-f429-4992-a485-5f0cdd36a042"})
  await Student.create({
    firstName: 'Kelly',
    lastName: 'Shralper',
    email: 'getting@tubed.wave',
    gpa: 1.3,
    schoolId: "c141e7d9-f429-4992-a485-5f0cdd36a042"})
}
