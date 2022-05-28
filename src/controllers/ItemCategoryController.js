/* eslint-disable no-sequences */
import { Op } from 'sequelize';
import ItemCategory from '../models/ItemCategory';

class ItemCategoryController {
  async index(req, res) {
    try {
      const { idCategory } = req.params;
      const { idCatParent } = req.params;
      const { idCatParentParent } = req.params;

      const where = {
        id_category: {
          [Op.or]: [idCategory, idCatParent, idCatParentParent],
        },
      };

      const itemCategories = await ItemCategory.findAll({
        attributes: ['id_item'],
        where,
      });
      const data = itemCategories
        .map((e) => e.id_item)
        .reduce((acc, cur) => (acc.includes(cur) || acc.push(cur), acc), []);
        // .map((e) => JSON.stringify(e))
        // .reduce((acc, cur) => (acc.includes(cur) || acc.push(cur), acc), [])
        // .map((e) => e.id_item);
        // .map((e) => JSON.parse(e));
      return res.json(data);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async store(req, res) {
    try {
      const itemCategory = await ItemCategory.create(req.body);
      return res.json(itemCategory);
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
      const itemCategory = await ItemCategory.findByPk(id, {
        attributes: ['id', 'id_item', 'id_category'],
        order: ['id'],
      });

      if (!itemCategory) {
        return res.status(400).json({
          errors: ['item_categoria não existe.'],
        });
      }

      return res.json(itemCategory);
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
      const itemCategory = await ItemCategory.findByPk(id);

      if (!itemCategory) {
        return res.status(400).json({
          errors: ['item_categoria não existe.'],
        });
      }
      await itemCategory.destroy();

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
      const itemCategory = await ItemCategory.findByPk(id);

      if (!itemCategory) {
        return res.status(400).json({
          errors: ['item_categoria não existe.'],
        });
      }

      const itemCategoryAtt = await ItemCategory.update(req.body);

      return res.json(itemCategoryAtt);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new ItemCategoryController();
