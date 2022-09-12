/* eslint-disable no-unused-vars */
import { Op } from 'sequelize';
import Category from '../models/Category';

class CategoryController {
  async indexZ(req, res) {
    // list for page categories
    try {
      let categories = [];

      /**
       * Function that assembles categories and subcategories
       * param idParent, ID of the parent category whose subcategories will be searched
       * param arrayCategory Array with categories
       */
      const categoryList = (idParent, arrayCategory) => {
        for (const category of arrayCategory) {
          if (category.id_parent === idParent) {
            categories.push(category);
            categoryList(category.id, arrayCategory);
          }
        }
      };

      const data = await Category.findAll();

      categoryList(0, data);

      return res.json(categories);
    } catch (e) {
      return res.json(null);
    }
  }

  async index(req, res) {
    // normal list
    try {
      let where = {};

      const { id1 } = req.params;
      const { id2 } = req.params;
      const { id3 } = req.params;

      if (id1 && id2 && id3) {
        where = {
          id: {
            [Op.or]: [id1, id2, id3],
          },
        };
      }

      const data = await Category.findAll({
        attributes: ['id', 'name', 'id_parent', 'id_parent_parent'],
        where,
      });
      return res.json(data);
    } catch (e) {
      return res.json(null);
    }
  }

  async store(req, res) {
    try {
      const newCategory = await Category.create(req.body);
      const { id, name, id_parent, id_parent_parent } = newCategory;
      return res.json({
        id,
        name,
        id_parent,
        id_parent_parent,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID.'],
        });
      }
      const category = await Category.findByPk(id, {
        order: ['id'],
      });

      if (!category) {
        return res.status(400).json({
          errors: ['Categoria não existe.'],
        });
      }

      return res.json(category);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID.'],
        });
      }
      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(400).json({
          errors: ['Categoria não existe.'],
        });
      }
      await category.destroy();

      return res.json({
        apagado: true,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID.'],
        });
      }
      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(400).json({
          errors: ['Categoria não existe.'],
        });
      }

      const categoryAtt = await category.update(req.body);

      return res.json(categoryAtt);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new CategoryController();
