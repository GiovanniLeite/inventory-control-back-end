import { Op } from 'sequelize';
import Item from '../models/Item';
import File from '../models/File';

class ItemController {
  async index(req, res) {
    try {
      let where = {};

      const { name } = req.params;
      const { id } = req.params;
      const { idParent } = req.params;
      const { idParentParent } = req.params;

      if (name) {
        where = {
          name: { [Op.like]: `${name}%` },
        };
      } else if (id && idParent && idParentParent) {
        if (parseInt(idParent) === 0 && parseInt(idParentParent) === 0) {
          // clicked on a main category
          where = {
            id_main_category: id,
          }
        } else if (parseInt(idParentParent) === 0) {
          // clicked on a subcategory1 category
          where = {
            id_sub1_category: id,
          }
        } else {
          // clicked on a subcategory2 category
          where = {
            id_sub2_category: id,
          }
        }
      }

      const items = await Item.findAll({
        order: [['id', 'DESC'], [File, 'id', 'DESC']],
        include: {
          model: File,
          attributes: ['url', 'filename'],
        },
        where,
      });

      return res.json(items);
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
      const item = await Item.findByPk(id, {
        order: [['id', 'DESC'], [File, 'id', 'DESC']],
        include: {
          model: File,
          attributes: ['url', 'filename'],
        },
      });

      if (!item) {
        return res.status(400).json({
          errors: ['Item não existe.'],
        });
      }

      return res.json(item);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async store(req, res) {
    try {
      const item = await Item.create(req.body);
      return res.json(item);
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
      const item = await Item.findByPk(id);

      if (!item) {
        return res.status(400).json({
          errors: ['Item não existe.'],
        });
      }
      await item.destroy();

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
      const item = await Item.findByPk(id);

      if (!item) {
        return res.status(400).json({
          errors: ['Item não existe.'],
        });
      }

      const itemAtt = await item.update(req.body);

      return res.json(itemAtt);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new ItemController();
