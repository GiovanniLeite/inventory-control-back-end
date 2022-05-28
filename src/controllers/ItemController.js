import { Op } from 'sequelize';
import Item from '../models/Item';
import FotoVideo from '../models/FotoVideo';

class ItemController {
  async index(req, res) {
    try {
      let where = {};

      const { name } = req.params;
      const { idMainCategory } = req.params;
      const { idSub1Category } = req.params;
      const { idSub2Category } = req.params;

      if (name) {
        where = {
          name: { [Op.like]: `${name}%` },
        };
      } else if (idMainCategory && idSub1Category && idSub2Category) {
        where = {
          [Op.or]: [
            { id_main_category: idMainCategory },
            { id_sub1_category: idSub1Category },
            { id_sub2_category: idSub2Category },
          ],
        };
      }

      const items = await Item.findAll({
        attributes: ['id', 'name', 'km', 'other', 'brand', 'date_release', 'new', 'custom_code', 'quantity',
          'country_manufactury', 'date_purchase', 'date_sale', 'price_purchase', 'price_sale', 'price_my', 'is_item', 'is_car', 'description', 'id_main_category', 'id_sub1_category', 'id_sub2_category'],
        order: [['id', 'DESC'], [FotoVideo, 'id', 'DESC']],
        include: {
          model: FotoVideo,
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
        attributes: ['id', 'name', 'km', 'other', 'brand', 'date_release', 'new', 'custom_code', 'quantity',
          'country_manufactury', 'date_purchase', 'date_sale', 'price_purchase', 'price_sale', 'price_my', 'is_item', 'is_car', 'description', 'id_main_category', 'id_sub1_category', 'id_sub2_category'],
        order: [['id', 'DESC'], [FotoVideo, 'id', 'DESC']],
        include: {
          model: FotoVideo,
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
