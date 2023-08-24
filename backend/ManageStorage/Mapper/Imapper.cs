using AutoMapper;
using ManageStorage.DTO;
using ManageStorage.Models;
using System.IO;

namespace ManageStorage.Mapper
{
    public class Imapper : Profile
    {
        public Imapper()
        {
            CreateMap<StorageDTO, Supplier>();
            CreateMap<ProductDTO, Supplier>();
            CreateMap<ProductDTO, Unit>();
            CreateMap<ProductDTO, Product>();
            CreateMap<InputTransaction, Product>();
            CreateMap<InputStorage, InputTransaction>().ForMember(dest => dest.PriceTransaction, opt => opt.MapFrom(src => src.Quantity *src.InputPrice));
        }
    
    }
}
