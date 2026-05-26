import db from '../config/db.js';

const Project = {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM projects ORDER BY id DESC');
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM projects WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async create(Data) {
    const { title, description, image_url, github_url, demo_url, tech_stack } = Data;
    const [result] = await db.query(
      'INSERT INTO projects (title, description, image_url, github_url, demo_url, tech_stack) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, image_url, github_url, demo_url, tech_stack]
    );
    return result.insertId;
  },
 
async update(id, data) {
  const { title, description, image_url, github_url, demo_url, tech_stack } = data;
  const [result] = await db.query(
    'UPDATE projects SET title = ?, description = ?, image_url = ?, github_url = ?, demo_url = ?, tech_stack = ? WHERE id = ?',
    [title, description, image_url, github_url, demo_url, tech_stack, id]
  );
  return result.affectedRows > 0; // Renvoie true si une ligne a été modifiée
},

async delete(id) {
  const [result] = await db.query('DELETE FROM projects WHERE id = ?', [id]);
  return result.affectedRows > 0; // Renvoie true si une ligne a été supprimée
}


};

export default Project;