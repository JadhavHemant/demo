app.get('/node-api/api/scorecard', async (req, res) => {
  const { companyname, responsibilitygroup, responsibilitycenter, project, object, objecttype, groupname } = req.query;

  try {
    let queryParams = [];
    let conditions = [];

    if (companyname) {
      conditions.push(`companyname = $${queryParams.push(companyname)}`);
    } else {
      conditions.push(`companyname IS NULL`);
    }

    if (responsibilitygroup) {
      conditions.push(`responsibilitygroup = $${queryParams.push(responsibilitygroup)}`);
    } else {
      conditions.push(`responsibilitygroup IS NULL`);
    }

    if (responsibilitycenter) {
      conditions.push(`responsibilitygroup = $${queryParams.push(responsibilitycenter)}`);
    } else {
      conditions.push(`responsibilitygroup IS NULL`);
    }
    
    if (responsibilitygroup) {
      conditions.push(`responsibilitygroup = $${queryParams.push(responsibilitygroup)}`);
    } else {
      conditions.push(`responsibilitygroup IS NULL`);
    }
   
    if (project) {
      conditions.push(`responsibilitygroup = $${queryParams.push(project)}`);
    } else {
      conditions.push(`responsibilitygroup IS NULL`);
    }

    if (object) {
      conditions.push(`responsibilitygroup = $${queryParams.push(object)}`);
    } else {
      conditions.push(`responsibilitygroup IS NULL`);
    }if (objecttype) {
      conditions.push(`responsibilitygroup = $${queryParams.push(objecttype)}`);
    } else {
      conditions.push(`responsibilitygroup IS NULL`);
    }if (groupname) {
      conditions.push(`responsibilitygroup = $${queryParams.push(groupname)}`);
    } else {
      conditions.push(`responsibilitygroup IS NULL`);
    }
    const sqlGet = `
      SELECT * FROM ai.governancetestresult
      WHERE ${conditions.join(' AND ')}
    `;

    const result = await pool.query(sqlGet, queryParams);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the data' });
  }
});
